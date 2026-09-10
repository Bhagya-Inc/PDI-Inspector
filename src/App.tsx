import { useState, useEffect, useMemo } from 'react';
import { InspectionSession, VehicleProfile } from './types/pdi';
import {
  getAllSessions,
  getActiveSession,
  createNewSession,
  saveSession,
  calculateInspectionSummary
} from './services/storage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NewInspectionPage } from './pages/NewInspectionPage';
import { InspectionPage } from './pages/InspectionPage';
import { ReviewPage } from './pages/ReviewPage';
import { ReportPage } from './pages/ReportPage';

export function App() {
  const [sessions, setSessions] = useState<InspectionSession[]>([]);
  const [activeSession, setActiveSession] = useState<InspectionSession | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'new' | 'inspect' | 'review' | 'report'>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');

  // Initial load from localStorage
  const refreshSessions = () => {
    const loaded = getAllSessions();
    setSessions(loaded);
    const active = getActiveSession();
    setActiveSession(active);
  };

  useEffect(() => {
    refreshSessions();
  }, []);

  // Compute summary for active session
  const activeSummary = useMemo(() => {
    if (!activeSession) return null;
    return calculateInspectionSummary(activeSession);
  }, [activeSession]);

  // Update session and trigger autosave indicator
  const handleUpdateSession = (updated: InspectionSession) => {
    setActiveSession(updated);
    saveSession(updated);
    const loaded = getAllSessions();
    setSessions(loaded);

    // Format current time (e.g. "12:42 PM")
    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    setLastSavedTime(timeStr);
  };

  // Start new inspection
  const handleStartNew = () => {
    setCurrentView('new');
  };

  const handleStartInspectionWithVehicle = (vehicle: VehicleProfile) => {
    const newSession = createNewSession(vehicle);
    setActiveSession(newSession);
    const loaded = getAllSessions();
    setSessions(loaded);
    setCurrentView('inspect');

    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    setLastSavedTime(timeStr);
  };

  const handleResume = (session: InspectionSession) => {
    setActiveSession(session);
    setCurrentView('inspect');
  };

  const handleViewReport = (session: InspectionSession) => {
    setActiveSession(session);
    setCurrentView('report');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        session={activeSession}
        summary={activeSummary}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        lastSavedTime={lastSavedTime}
      />

      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage
            sessions={sessions}
            activeSession={activeSession}
            onStartNew={handleStartNew}
            onResume={handleResume}
            onViewReport={handleViewReport}
            onSessionsChanged={refreshSessions}
          />
        )}

        {currentView === 'new' && (
          <NewInspectionPage
            onBack={() => setCurrentView('home')}
            onStartInspection={handleStartInspectionWithVehicle}
          />
        )}

        {currentView === 'inspect' && activeSession && activeSummary && (
          <InspectionPage
            session={activeSession}
            summary={activeSummary}
            onUpdateSession={handleUpdateSession}
            onGoToReview={() => {
              setCurrentView('review');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {currentView === 'review' && activeSession && activeSummary && (
          <ReviewPage
            session={activeSession}
            summary={activeSummary}
            onBackToInspect={() => setCurrentView('inspect')}
            onViewReportPreview={() => setCurrentView('report')}
          />
        )}

        {currentView === 'report' && activeSession && activeSummary && (
          <ReportPage
            session={activeSession}
            summary={activeSummary}
            onBack={() => setCurrentView('review')}
          />
        )}
      </div>
    </div>
  );
}
export default App;
