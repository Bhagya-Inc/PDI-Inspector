import React from 'react';
import { InspectionSummary } from '../types/pdi';
import { CheckCircle2, XCircle, CircleDashed, AlertTriangle } from 'lucide-react';

interface ProgressBarProps {
  summary: InspectionSummary;
  activeFilter?: string;
  onSelectFilter?: (filter: string) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  summary,
  activeFilter = 'all',
  onSelectFilter
}) => {
  const completed = summary.passed + summary.rejected;
  const percentCompleted = summary.total > 0 ? Math.round((completed / summary.total) * 100) : 0;
  const percentPassed = summary.total > 0 ? (summary.passed / summary.total) * 100 : 0;
  const percentRejected = summary.total > 0 ? (summary.rejected / summary.total) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">PDI Progress</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {percentCompleted}% completed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            <span className="font-semibold text-slate-800">{completed}</span> of{' '}
            <span className="font-semibold text-slate-800">{summary.total}</span> checks completed
          </p>
        </div>

        {summary.rejected > 0 && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>{summary.rejected} issue{summary.rejected > 1 ? 's' : ''} recorded</span>
          </div>
        )}
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-3.5 shadow-inner">
        <div
          style={{ width: `${percentPassed}%` }}
          className="bg-emerald-500 transition-all duration-300 ease-out"
          title={`Passed: ${summary.passed}`}
        />
        <div
          style={{ width: `${percentRejected}%` }}
          className="bg-rose-500 transition-all duration-300 ease-out"
          title={`Rejected: ${summary.rejected}`}
        />
      </div>

      {/* Interactive filter badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => onSelectFilter?.('all')}
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
          }`}
        >
          <span>All Checks</span>
          <span className="font-bold ml-1">{summary.total}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter?.('passed')}
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            activeFilter === 'passed'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 border-emerald-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-700" />
            Passed
          </span>
          <span className="font-bold">{summary.passed}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter?.('rejected')}
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            activeFilter === 'rejected'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-rose-50/60 hover:bg-rose-100/60 text-rose-800 border-rose-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
          <span className="font-bold">{summary.rejected}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter?.('not_checked')}
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            activeFilter === 'not_checked'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <CircleDashed className="w-3.5 h-3.5 text-slate-400" />
            Remaining
          </span>
          <span className="font-bold">{summary.notChecked}</span>
        </button>
      </div>
    </div>
  );
};
