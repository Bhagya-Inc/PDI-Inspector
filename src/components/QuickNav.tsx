import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, SkipForward } from 'lucide-react';

interface QuickNavProps {
  onPrevious: () => void;
  onNext: () => void;
  onPassAndNext: () => void;
  onRejectCurrent: () => void;
  onSkip: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentItemTitle?: string;
  stepIndex: number;
  totalSteps: number;
  readOnly?: boolean;
}

export const QuickNav: React.FC<QuickNavProps> = ({
  onPrevious,
  onNext,
  onPassAndNext,
  onRejectCurrent,
  onSkip,
  hasPrevious,
  hasNext,
  stepIndex,
  totalSteps,
  readOnly = false
}) => {
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Previous Button */}
        <button
          type="button"
          disabled={!hasPrevious}
          onClick={onPrevious}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Previous check"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Middle: Fast Action Group */}
        <div className="flex items-center gap-2">
          {/* Quick Reject */}
          <button
            type="button"
            disabled={readOnly}
            onClick={onRejectCurrent}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject</span>
          </button>

          {/* Primary Action: Mark Pass & Next */}
          <button
            type="button"
            disabled={readOnly}
            onClick={onPassAndNext}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Mark Pass & Next</span>
          </button>

          {/* Skip */}
          <button
            type="button"
            onClick={onSkip}
            className="hidden sm:flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold transition-colors"
            title="Skip to next without marking"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>
        </div>

        {/* Next Button / Step indicator */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block text-xs font-medium text-slate-400">
            {stepIndex} / {totalSteps}
          </span>
          <button
            type="button"
            disabled={!hasNext}
            onClick={onNext}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Next check"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
