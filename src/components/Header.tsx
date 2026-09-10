import React from 'react';
import { InspectionSession, InspectionSummary } from '../types/pdi';
import { Car, CheckCircle2, XCircle, Clock, Home, Award, Menu } from 'lucide-react';

interface HeaderProps {
  session: InspectionSession | null;
  summary: InspectionSummary | null;
  currentView: 'home' | 'new' | 'inspect' | 'review' | 'report';
  onNavigate: (view: 'home' | 'new' | 'inspect' | 'review' | 'report') => void;
  onOpenMobileMenu?: () => void;
  lastSavedTime?: string;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  summary,
  currentView,
  onNavigate,
  onOpenMobileMenu,
  lastSavedTime
}) => {
  const vehicle = session?.vehicle;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Mobile Menu button */}
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && currentView === 'inspect' && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Open categories menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  PDI Inspector
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                    Pro
                  </span>
                </span>
                <p className="text-xs text-slate-500 hidden sm:block">Vehicle Pre-Delivery Assistant</p>
              </div>
            </button>
          </div>

          {/* Middle: Active Vehicle & Progress Overview (shown during inspection) */}
          {session && (currentView === 'inspect' || currentView === 'review' || currentView === 'report') && (
            <div className="hidden md:flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  {vehicle?.manufacturer} {vehicle?.model} {vehicle?.variant}
                </span>
                {vehicle?.fuelTypes?.includes('CNG') && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    iCNG
                  </span>
                )}
              </div>

              {summary && (
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5">
                  <span className="font-medium text-slate-700">
                    {summary.passed + summary.rejected} / {summary.total} checks
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {summary.passed} pass
                  </span>
                  {summary.rejected > 0 && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        {summary.rejected} reject
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Right: Autosave status & View Nav buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {lastSavedTime && (
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Saved {lastSavedTime}</span>
              </div>
            )}

            {session && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate('inspect')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'inspect'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Inspect
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('review')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentView === 'review' || currentView === 'report'
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  Review & Report
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  title="My Sessions / Home"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
                >
                  <Home className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
