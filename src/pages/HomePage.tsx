import React, { useState } from 'react';
import { InspectionSession, InspectionSummary } from '../types/pdi';
import { calculateInspectionSummary, deleteSession, setActiveSessionId } from '../services/storage';
import { ConfirmationModal } from '../components/ConfirmationModal';
import {
  Car,
  Plus,
  Play,
  FileText,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Disc,
  Cpu,
  Flame,
  Sparkles,
  Zap,
  Wind,
  Layers,
  Award
} from 'lucide-react';

interface HomePageProps {
  sessions: InspectionSession[];
  activeSession: InspectionSession | null;
  onStartNew: () => void;
  onResume: (session: InspectionSession) => void;
  onViewReport: (session: InspectionSession) => void;
  onSessionsChanged: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  sessions,
  activeSession,
  onStartNew,
  onResume,
  onViewReport,
  onSessionsChanged
}) => {
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const activeSessionSummary = activeSession ? calculateInspectionSummary(activeSession) : null;
  const resumableSession =
    activeSession && !activeSession.isCompleted && activeSessionSummary && activeSessionSummary.notChecked > 0
      ? activeSession
      : null;

  const handleDeleteConfirm = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
      setSessionToDelete(null);
      onSessionsChanged();
    }
  };

  const checklistHighlights = [
    { label: 'Documents & Invoices', icon: FileText },
    { label: 'VIN & Manufacturing', icon: ShieldCheck },
    { label: 'Exterior 360° & Paint', icon: Eye },
    { label: 'Tyres & Wheels', icon: Disc },
    { label: 'Engine Bay & Fluids', icon: Cpu },
    { label: 'CNG Safety System', icon: Flame },
    { label: 'Interior & Cabin', icon: Sparkles },
    { label: 'Electronics & Lights', icon: Zap },
    { label: 'AC & Climate', icon: Wind },
    { label: 'Test Drive & Brakes', icon: Car },
    { label: 'Underbody Safe Check', icon: Layers },
    { label: 'Final Sign-off Audit', icon: Award }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
          <Car className="w-3.5 h-3.5 text-sky-600" />
          <span>New Car Delivery Companion</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Vehicle PDI Inspector
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          A simple step-by-step inspection assistant for new car buyers.
        </p>

        <p className="text-xs sm:text-sm text-slate-500 bg-slate-100/80 border border-slate-200/80 p-3 rounded-2xl max-w-lg mx-auto">
          No special tools required. Inspect using your <strong>eyes</strong>, <strong>hands</strong>,{' '}
          <strong>ears</strong>, and the vehicle's normal controls.
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartNew}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Start New PDI</span>
          </button>

          {resumableSession ? (
            <button
              type="button"
              onClick={() => onResume(resumableSession)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md shadow-slate-900/20 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Resume PDI ({resumableSession.vehicle.model})</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-medium text-sm border border-slate-200 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>No active inspection found</span>
            </button>
          )}
        </div>
      </div>

      {/* Saved Sessions List Section */}
      {sessions.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">My PDI Sessions</h2>
              <p className="text-xs text-slate-500">Stored privately in your browser local storage</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {sessions.length} Session{sessions.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((sess) => {
              const summary: InspectionSummary = calculateInspectionSummary(sess);
              const isCurrent = activeSession?.id === sess.id;
              const isCompleted = sess.isCompleted || summary.notChecked === 0;
              const formattedDate = new Date(sess.updatedAt || sess.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={sess.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-white border-sky-400 shadow-sm ring-1 ring-sky-400/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {sess.vehicle.manufacturer} {sess.vehicle.model}
                        </h3>
                        {sess.vehicle.fuelTypes.includes('CNG') && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            CNG
                          </span>
                        )}
                        {isCurrent && !isCompleted && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {sess.vehicle.variant} • {sess.vehicle.color} • {sess.vehicle.transmission}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">Updated {formattedDate}</p>
                    </div>

                    {/* Decision Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border whitespace-nowrap ${
                        summary.criticalIssues > 0
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : summary.rejected > 0
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : summary.notChecked === 0
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {summary.passed + summary.rejected === summary.total
                        ? 'Completed'
                        : `${summary.passed + summary.rejected}/${summary.total} Done`}
                    </span>
                  </div>

                  {/* Stat breakdown */}
                  <div className="flex items-center gap-3 mt-4 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {summary.passed} Passed
                    </span>
                    {summary.rejected > 0 && (
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        {summary.rejected} Rejected
                      </span>
                    )}
                    <span className="text-slate-400">{summary.notChecked} Remaining</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        if (isCompleted) {
                          onViewReport(sess);
                          return;
                        }
                        setActiveSessionId(sess.id);
                        onResume(sess);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      {isCompleted ? <FileText className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {isCompleted ? 'View Report' : 'Resume'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewReport(sess)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Report
                      </button>

                      <button
                        type="button"
                        onClick={() => setSessionToDelete(sess.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* What You'll Check Grid */}
      <div className="space-y-4 pt-4">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">What You'll Check</h2>
          <p className="text-xs text-slate-500">Comprehensive, logical checklist organized into 28 structured categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {checklistHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-snug">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Privacy Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-600 max-w-xl mx-auto">
        <p className="font-semibold text-slate-800">100% Client-Side & Private</p>
        <p className="mt-1">
          Your inspection data stays safely on this device. This app does not upload your PDI information or photos to
          any server.
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(sessionToDelete)}
        title="Delete PDI Session?"
        message="Are you sure? This inspection session and all attached notes and photos cannot be recovered."
        confirmLabel="Delete Session"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSessionToDelete(null)}
      />
    </div>
  );
};
