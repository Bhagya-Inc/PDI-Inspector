import React, { useState } from 'react';
import { ChecklistItem, CheckResult } from '../types/pdi';
import {
  CheckCircle2,
  XCircle,
  CircleDashed,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Camera,
  FileText,
  Info,
  ShieldAlert,
  ArrowRight,
  Eye,
  Trash2
} from 'lucide-react';

interface ChecklistCardProps {
  item: ChecklistItem;
  index: number;
  result?: CheckResult;
  onPass: (itemId: string) => void;
  onReject: (item: ChecklistItem) => void;
  onReset: (itemId: string) => void;
  onUpdateNotes: (itemId: string, notes: string) => void;
  onPassAndNext?: (itemId: string) => void;
  onViewPhoto?: (photoUrl: string) => void;
  onRemovePhoto?: (itemId: string) => void;
  readOnly?: boolean;
  autoExpand?: boolean;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  item,
  index,
  result,
  onPass,
  onReject,
  onReset,
  onUpdateNotes,
  onPassAndNext,
  onViewPhoto,
  onRemovePhoto,
  readOnly = false,
  autoExpand = false
}) => {
  const [isExpanded, setIsExpanded] = useState(autoExpand);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState(result?.notes || '');

  const status = result?.status || 'not_checked';

  const handleSaveNotes = () => {
    onUpdateNotes(item.id, notesText);
    setIsEditingNotes(false);
  };

  // Severity styling
  const severityBadge = {
    critical: 'bg-rose-100 text-rose-800 border-rose-200',
    major: 'bg-amber-100 text-amber-800 border-amber-200',
    minor: 'bg-sky-100 text-sky-800 border-sky-200'
  }[item.severity];

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        status === 'passed'
          ? 'bg-white border-emerald-200/90 shadow-xs'
          : status === 'rejected'
          ? 'bg-rose-50/20 border-rose-300 shadow-sm'
          : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      {/* Compact Header Summary Row */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Check #{String(index + 1).padStart(2, '0')}
              </span>

              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${severityBadge}`}>
                {item.severity}
              </span>

              {item.photoRecommended && (
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <Camera className="w-3 h-3 text-slate-500" />
                  Photo Advised
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 tracking-tight">{item.title}</h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.whatToCheck}</p>
          </div>

          {/* Status Indicator Badge */}
          <div className="flex items-center gap-2 self-start">
            {status === 'passed' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                PASS
              </span>
            )}
            {status === 'rejected' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                <XCircle className="w-4 h-4 text-rose-600" />
                REJECT
              </span>
            )}
            {status === 'not_checked' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <CircleDashed className="w-4 h-4 text-slate-400" />
                NOT CHECKED
              </span>
            )}
          </div>
        </div>

        {/* Existing Notes / Photo Snippet Preview if present */}
        {(result?.notes || result?.photoUrl) && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700 flex-1 min-w-[200px]">
              <FileText className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate italic">"{result.notes || 'Photo attached'}"</span>
            </div>

            {result.photoUrl && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onViewPhoto?.(result.photoUrl!)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-2 py-1 rounded border border-sky-200"
                >
                  <Eye className="w-3 h-3" />
                  View Photo
                </button>
                <button
                  type="button"
                  onClick={() => onRemovePhoto?.(item.id)}
                  disabled={readOnly}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded disabled:opacity-40 disabled:pointer-events-none"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Expand / Collapse Button & Quick Status Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors py-1"
          >
            <span>{isExpanded ? 'Hide Check Guide' : 'View Check Details'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Quick Action Button Group */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPass(item.id)}
              disabled={readOnly}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                status === 'passed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              PASS
            </button>

            <button
              type="button"
              onClick={() => onReject(item)}
              disabled={readOnly}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                status === 'rejected'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              REJECT
            </button>

            {status !== 'not_checked' && (
              <button
                type="button"
                onClick={() => onReset(item.id)}
                disabled={readOnly}
                className="px-2.5 py-1.5 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Reset check to Not Checked"
              >
                Reset
              </button>
            )}

            {onPassAndNext && status !== 'passed' && (
              <button
                type="button"
                onClick={() => onPassAndNext(item.id)}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs ml-1"
              >
                <span>Pass & Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Detailed 5-Point Inspection Panel */}
      {isExpanded && (
        <div className="bg-slate-50/70 border-t border-slate-200/90 p-4 sm:p-6 space-y-4">
          {/* Safety Warning Box if present */}
          {item.safetyWarning && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider text-[10px] text-amber-700">Safety Instruction</p>
                <p className="mt-0.5 font-medium">{item.safetyWarning}</p>
              </div>
            </div>
          )}

          {/* 5-Question Framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. WHAT */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                1. What To Check
              </span>
              <p className="text-xs text-slate-800 mt-2 font-medium leading-relaxed">{item.whatToCheck}</p>
            </div>

            {/* 2. WHERE */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                2. Where To Find It
              </span>
              <p className="text-xs text-slate-800 mt-2 font-medium leading-relaxed">{item.whereToFind}</p>
            </div>

            {/* 3. HOW (Full Width) */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                3. How To Check (Step-by-Step)
              </span>
              <ol className="mt-2 space-y-1.5 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
                {item.howToCheck.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="font-medium text-slate-800">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 4. NORMAL CONDITION */}
            <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  4. Normal Condition
                </span>
              </div>
              <p className="text-xs text-emerald-950 mt-1.5 font-medium leading-relaxed">
                {item.normalCondition}
              </p>
            </div>

            {/* 5. REJECT / RED FLAG */}
            <div className="bg-rose-50/40 p-3.5 rounded-xl border border-rose-200">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                  5. Reject / Red Flag Condition
                </span>
              </div>
              <p className="text-xs text-rose-950 mt-1.5 font-medium leading-relaxed">
                {item.rejectCondition}
              </p>
            </div>
          </div>

          {/* Why This Matters Helper Box */}
          {item.whyItMatters && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700">
              <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sky-900 text-[11px]">Why this check matters: </span>
                <span className="leading-relaxed">{item.whyItMatters}</span>
              </div>
            </div>
          )}

          {/* Notes Input Area */}
          <div className="pt-2">
            {!isEditingNotes && !result?.notes ? (
              <button
                type="button"
                onClick={() => setIsEditingNotes(true)}
                disabled={readOnly}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 py-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>+ Add inspection notes</span>
              </button>
            ) : isEditingNotes ? (
              <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800">Inspection Notes</label>
                <textarea
                  rows={2}
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Record your observations or dealer explanation..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingNotes(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={readOnly}
                    className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                  <p className="text-slate-800 font-medium">{result?.notes}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotesText(result?.notes || '');
                    setIsEditingNotes(true);
                  }}
                  disabled={readOnly}
                  className="text-sky-600 hover:text-sky-800 font-semibold text-[11px]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
