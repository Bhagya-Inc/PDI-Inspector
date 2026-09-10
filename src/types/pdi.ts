export type CheckStatus = 'not_checked' | 'passed' | 'rejected';
export type Severity = 'critical' | 'major' | 'minor';

export interface VehicleProfile {
  id: string;
  manufacturer: string;
  model: string;
  variant: string;
  fuelTypes: string[]; // e.g. ['CNG', 'Petrol'], ['Petrol'], ['Diesel'], ['EV']
  transmission: string; // e.g. 'Manual', 'Automatic', 'AMT', 'DCT', 'CVT'
  color: string;
  vin: string;
  engineNumber: string;
  registrationNumber?: string;
  dealerName: string;
  inspectionDate: string;
  inspectorName: string;
  odometerReading: string;
  manufacturingMonthYear: string;
}

export interface ChecklistItem {
  id: string;
  categoryId: string;
  title: string;
  whatToCheck: string;
  whereToFind: string;
  howToCheck: string[];
  normalCondition: string;
  rejectCondition: string;
  severity: Severity;
  whyItMatters?: string;
  photoRecommended?: boolean;
  safetyWarning?: string;
  applicableTo?: {
    fuelTypes?: string[];
    transmissions?: string[];
    manufacturers?: string[];
    models?: string[];
  };
}

export interface Category {
  id: string;
  number: string;
  name: string;
  description: string;
  iconName: string;
}

export interface CheckResult {
  itemId: string;
  status: CheckStatus;
  timestamp?: string;
  notes?: string;
  photoUrl?: string; // base64 compressed data url
}

export interface InspectionSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  vehicle: VehicleProfile;
  results: Record<string, CheckResult>; // itemId -> CheckResult
  isCompleted?: boolean;
}

export type OverallDecision =
  | 'STOP / PROFESSIONAL REVIEW RECOMMENDED'
  | 'ACTION REQUIRED'
  | 'PASSED WITH OBSERVATIONS'
  | 'PASSED'
  | 'INCOMPLETE';

export interface InspectionSummary {
  total: number;
  passed: number;
  rejected: number;
  notChecked: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  decision: OverallDecision;
  decisionExplanation: string;
  categoryStats: Record<string, { total: number; passed: number; rejected: number; notChecked: number }>;
}
