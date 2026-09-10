import { ChecklistItem, CheckResult, InspectionSession, InspectionSummary, OverallDecision, VehicleProfile } from '../types/pdi';
import { CHECKLIST_ITEMS } from '../data/checklistData';
import { CATEGORIES } from '../data/categories';

const SESSIONS_STORAGE_KEY = 'pdi_checker_sessions_v1';
const ACTIVE_SESSION_ID_KEY = 'pdi_checker_active_session_id';

/**
 * Filter checks that apply to the current vehicle profile.
 */
export function getApplicableChecks(vehicle: VehicleProfile, items: ChecklistItem[] = CHECKLIST_ITEMS): ChecklistItem[] {
  return items.filter((item) => {
    if (!item.applicableTo) return true;

    // Filter by fuel types (e.g. CNG checks only if vehicle fuel includes CNG)
    if (item.applicableTo.fuelTypes && item.applicableTo.fuelTypes.length > 0) {
      const hasMatchingFuel = item.applicableTo.fuelTypes.some((fuel) =>
        vehicle.fuelTypes.some((vFuel) => vFuel.toLowerCase() === fuel.toLowerCase())
      );
      if (!hasMatchingFuel) return false;
    }

    // Filter by transmission (e.g. Manual vs Automatic)
    if (item.applicableTo.transmissions && item.applicableTo.transmissions.length > 0) {
      const hasMatchingTransmission = item.applicableTo.transmissions.some((trans) =>
        vehicle.transmission.toLowerCase().includes(trans.toLowerCase())
      );
      if (!hasMatchingTransmission) return false;
    }

    // Filter by manufacturer
    if (item.applicableTo.manufacturers && item.applicableTo.manufacturers.length > 0) {
      const hasMatchingMfr = item.applicableTo.manufacturers.some(
        (mfr) => mfr.toLowerCase() === vehicle.manufacturer.toLowerCase()
      );
      if (!hasMatchingMfr) return false;
    }

    // Filter by model
    if (item.applicableTo.models && item.applicableTo.models.length > 0) {
      const hasMatchingModel = item.applicableTo.models.some(
        (mod) => mod.toLowerCase() === vehicle.model.toLowerCase()
      );
      if (!hasMatchingModel) return false;
    }

    return true;
  });
}

/**
 * Load all stored sessions.
 */
export function getAllSessions(): InspectionSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse sessions from localStorage', err);
    return [];
  }
}

/**
 * Save all sessions to localStorage.
 */
export function saveAllSessions(sessions: InspectionSession[]): void {
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save sessions to localStorage', err);
  }
}

/**
 * Get the currently active session ID.
 */
export function getActiveSessionId(): string | null {
  return localStorage.getItem(ACTIVE_SESSION_ID_KEY);
}

/**
 * Set the currently active session ID.
 */
export function setActiveSessionId(id: string | null): void {
  if (id) {
    localStorage.setItem(ACTIVE_SESSION_ID_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_SESSION_ID_KEY);
  }
}

/**
 * Retrieve the active session.
 */
export function getActiveSession(): InspectionSession | null {
  const activeId = getActiveSessionId();
  if (!activeId) return null;
  const sessions = getAllSessions();
  const activeSession = sessions.find((s) => s.id === activeId) || null;

  if (!activeSession) {
    setActiveSessionId(null);
    return null;
  }

  // Treat older sessions as complete too, even if they predate isCompleted.
  if (activeSession.isCompleted || calculateInspectionSummary(activeSession).notChecked === 0) {
    activeSession.isCompleted = true;
    saveAllSessions(sessions);
    setActiveSessionId(null);
    return null;
  }

  return activeSession;
}

/**
 * Create and persist a new inspection session.
 */
export function createNewSession(vehicle: VehicleProfile): InspectionSession {
  const newId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const newSession: InspectionSession = {
    id: newId,
    createdAt: now,
    updatedAt: now,
    vehicle,
    results: {},
    isCompleted: false
  };

  const sessions = getAllSessions();
  sessions.unshift(newSession);
  saveAllSessions(sessions);
  setActiveSessionId(newId);

  return newSession;
}

/**
 * Save / update a session.
 */
export function saveSession(session: InspectionSession): void {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);

  if (index >= 0) {
    const storedSession = sessions[index];
    const storedIsCompleted = storedSession.isCompleted || calculateInspectionSummary(storedSession).notChecked === 0;
    if (storedIsCompleted) return;
  }

  session.updatedAt = new Date().toISOString();
  session.isCompleted = calculateInspectionSummary(session).notChecked === 0;

  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.unshift(session);
  }

  saveAllSessions(sessions);
}

/**
 * Delete a session permanently.
 */
export function deleteSession(id: string): void {
  const sessions = getAllSessions().filter((s) => s.id !== id);
  saveAllSessions(sessions);

  if (getActiveSessionId() === id) {
    setActiveSessionId(sessions.length > 0 ? sessions[0].id : null);
  }
}

/**
 * Record a check result in a session.
 */
export function recordCheckResult(
  sessionId: string,
  itemId: string,
  result: Partial<CheckResult>
): InspectionSession | null {
  const sessions = getAllSessions();
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return null;
  if (session.isCompleted || calculateInspectionSummary(session).notChecked === 0) return null;

  const existing = session.results[itemId] || { itemId, status: 'not_checked' };
  session.results[itemId] = {
    ...existing,
    ...result,
    itemId,
    timestamp: new Date().toISOString()
  };
  session.updatedAt = new Date().toISOString();
  session.isCompleted = calculateInspectionSummary(session).notChecked === 0;

  saveAllSessions(sessions);
  if (session.isCompleted && getActiveSessionId() === session.id) {
    setActiveSessionId(null);
  }
  return session;
}

/**
 * Calculate full summary stats and overall decision.
 */
export function calculateInspectionSummary(session: InspectionSession): InspectionSummary {
  const applicableItems = getApplicableChecks(session.vehicle);
  const total = applicableItems.length;

  let passed = 0;
  let rejected = 0;
  let notChecked = 0;
  let criticalIssues = 0;
  let majorIssues = 0;
  let minorIssues = 0;

  const categoryStats: Record<string, { total: number; passed: number; rejected: number; notChecked: number }> = {};

  // Initialize category stats
  CATEGORIES.forEach((cat) => {
    categoryStats[cat.id] = { total: 0, passed: 0, rejected: 0, notChecked: 0 };
  });

  applicableItems.forEach((item) => {
    const result = session.results[item.id];
    const status = result?.status || 'not_checked';

    if (!categoryStats[item.categoryId]) {
      categoryStats[item.categoryId] = { total: 0, passed: 0, rejected: 0, notChecked: 0 };
    }
    categoryStats[item.categoryId].total += 1;

    if (status === 'passed') {
      passed += 1;
      categoryStats[item.categoryId].passed += 1;
    } else if (status === 'rejected') {
      rejected += 1;
      categoryStats[item.categoryId].rejected += 1;

      if (item.severity === 'critical') {
        criticalIssues += 1;
      } else if (item.severity === 'major') {
        majorIssues += 1;
      } else {
        minorIssues += 1;
      }
    } else {
      notChecked += 1;
      categoryStats[item.categoryId].notChecked += 1;
    }
  });

  // Decision logic
  let decision: OverallDecision = 'PASSED';
  let decisionExplanation = 'All inspection checks passed successfully. No defects observed.';

  if (criticalIssues > 0) {
    decision = 'STOP / PROFESSIONAL REVIEW RECOMMENDED';
    decisionExplanation = `${criticalIssues} critical safety or documentation issue(s) detected. We recommend pausing delivery and requesting the dealership resolve or professionally inspect these issues before signing acceptance.`;
  } else if (notChecked > 0) {
    decision = 'INCOMPLETE';
    decisionExplanation = `${notChecked} check(s) remain incomplete. Complete all checks for a full pre-delivery clearance, or generate an interim report.`;
  } else if (majorIssues > 0) {
    decision = 'ACTION REQUIRED';
    decisionExplanation = `${majorIssues} major issue(s) recorded. Require written dealership rectification on the delivery challan prior to driving away.`;
  } else if (minorIssues > 0) {
    decision = 'PASSED WITH OBSERVATIONS';
    decisionExplanation = `${minorIssues} minor cosmetic observation(s) noted. Suitable for acceptance with dealer notation.`;
  }

  return {
    total,
    passed,
    rejected,
    notChecked,
    criticalIssues,
    majorIssues,
    minorIssues,
    decision,
    decisionExplanation,
    categoryStats
  };
}
