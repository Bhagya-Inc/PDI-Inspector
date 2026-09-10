import React, { useState, useEffect } from 'react';
import { InspectionSession, InspectionSummary } from '../types/pdi';
import { CATEGORIES } from '../data/categories';
import { getApplicableChecks } from '../services/storage';
import { generatePdfReport } from '../services/pdfGenerator';
import { PhotoModal } from '../components/PhotoModal';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileDown,
  ArrowLeft,
  Eye
} from 'lucide-react';

interface ReviewPageProps {
  session: InspectionSession;
  summary: InspectionSummary;
  onBackToInspect: () => void;
  onViewReportPreview: () => void;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({
  session,
  summary,
  onBackToInspect,
  onViewReportPreview
}) => {
  const [enlargedPhoto, setEnlargedPhoto] = useState<string | null>(null);
  const [showIncompleteNotice, setShowIncompleteNotice] = useState(summary.notChecked > 0);

  const applicableChecks = getApplicableChecks(session.vehicle);

  // Trigger celebration confetti if all passed and 0 rejected
  useEffect(() => {
    if (summary.passed === summary.total && summary.rejected === 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti failed to trigger', err);
      }
    }
  }, [summary.passed, summary.total, summary.rejected]);

  // List of rejected items with category names
  const rejectedItems = applicableChecks
    .filter((item) => session.results[item.id]?.status === 'rejected')
    .map((item) => {
      const res = session.results[item.id];
      const cat = CATEGORIES.find((c) => c.id === item.categoryId);
      return {
        item,
        category: cat,
        notes: res?.notes || 'No observation notes recorded.',
        photoUrl: res?.photoUrl
      };
    });

  // List of incomplete items
  const incompleteItems = applicableChecks.filter(
    (item) => !session.results[item.id] || session.results[item.id].status === 'not_checked'
  );

  const handleDownloadPdf = () => {
    generatePdfReport(session, summary);
  };

  // Outcome banner color
  const outcomeBannerColor = {
    'STOP / PROFESSIONAL REVIEW RECOMMENDED': 'bg-rose-50 border-rose-300 text-rose-900',
    'ACTION REQUIRED': 'bg-amber-50 border-amber-300 text-amber-900',
    'PASSED WITH OBSERVATIONS': 'bg-yellow-50 border-yellow-300 text-yellow-900',
    PASSED: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    INCOMPLETE: 'bg-slate-100 border-slate-300 text-slate-800'
  }[summary.decision];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header & Back link */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToInspect}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Checklist</span>
        </button>

        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Category 28: Final Acceptance Review
        </span>
      </div>

      {/* Main Title & Executive Decision Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Inspection Review & Sign-off</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pre-Delivery Inspection Audit
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {session.vehicle.manufacturer} {session.vehicle.model} {session.vehicle.variant} •{' '}
              {session.vehicle.color}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onViewReportPreview}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              View Preview
            </button>
          </div>
        </div>

        {/* Overall Decision Banner */}
        <div className={`p-5 rounded-2xl border-2 ${outcomeBannerColor} space-y-1.5`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider">Overall PDI Determination:</span>
            <span className="text-base sm:text-lg font-black">{summary.decision}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
            {summary.decisionExplanation}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="block text-2xl font-black text-slate-900">{summary.total}</span>
            <span className="text-xs font-semibold text-slate-500">Total Checks</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="block text-2xl font-black text-emerald-700">{summary.passed}</span>
            <span className="text-xs font-semibold text-emerald-800">Passed (✓)</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-center">
            <span className="block text-2xl font-black text-rose-700">{summary.rejected}</span>
            <span className="text-xs font-semibold text-rose-800">Rejected (✕)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center">
            <span className="block text-2xl font-black text-slate-700">{summary.notChecked}</span>
            <span className="text-xs font-semibold text-slate-500">Remaining (○)</span>
          </div>
        </div>

        {/* Severity Breakdown if rejections exist */}
        {summary.rejected > 0 && (
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span>Defects Breakdown:</span>
            <span className="text-rose-600 font-bold">{summary.criticalIssues} Critical</span>
            <span className="text-amber-600 font-bold">{summary.majorIssues} Major</span>
            <span className="text-sky-600 font-bold">{summary.minorIssues} Minor</span>
          </div>
        )}
      </div>

      {/* Incomplete Checks Warning Card */}
      {summary.notChecked > 0 && showIncompleteNotice && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-3xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900">
                ⚠ {summary.notChecked} Checks Remain Incomplete
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                For complete delivery protection, we recommend verifying all checklist items before driving off.
                Generating a report now will be clearly stamped as <strong>"PDI INCOMPLETE"</strong>.
              </p>

              {/* List of incomplete items */}
              <div className="mt-3 max-h-36 overflow-y-auto rounded-xl bg-white/70 border border-amber-200 p-2.5 text-xs space-y-1">
                {incompleteItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2 text-amber-950 font-medium">
                    <span className="text-[10px] font-mono font-bold text-amber-600">#{idx + 1}</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onBackToInspect}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Complete Remaining Checks
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 bg-white text-amber-900 hover:bg-amber-100 rounded-xl text-xs font-bold border border-amber-300 transition-colors"
                >
                  Generate Report Anyway (PDI INCOMPLETE)
                </button>

                <button
                  type="button"
                  onClick={() => setShowIncompleteNotice(false)}
                  className="px-3 py-2 text-amber-700 hover:text-amber-900 text-xs font-semibold"
                >
                  Dismiss Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejected Items Detailed Log */}
      {rejectedItems.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Recorded Defect & Rejection Log ({rejectedItems.length})</span>
              </h2>
              <p className="text-xs text-slate-500">Require written dealer confirmation on delivery gate pass</p>
            </div>
          </div>

          <div className="space-y-4">
            {rejectedItems.map((r, idx) => (
              <div
                key={r.item.id}
                className={`p-4 sm:p-5 rounded-2xl border ${
                  r.item.severity === 'critical'
                    ? 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                      <span className="text-xs font-semibold text-slate-600">
                        [{r.category?.number} {r.category?.name}]
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                          r.item.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : r.item.severity === 'major'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-sky-100 text-sky-800 border-sky-200'
                        }`}
                      >
                        {r.item.severity}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{r.item.title}</h4>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-100/70 px-2.5 py-1 rounded-full self-start">
                    <XCircle className="w-3.5 h-3.5" />
                    REJECTED
                  </span>
                </div>

                {/* Reason */}
                <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200/80 text-xs">
                  <span className="font-bold text-slate-800">Observed Reason / Note: </span>
                  <span className="text-slate-700 italic">"{r.notes}"</span>
                </div>

                {/* Photo if present */}
                {r.photoUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEnlargedPhoto(r.photoUrl!)}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 h-16 w-24 bg-slate-100 flex items-center justify-center flex-shrink-0"
                    >
                      <img src={r.photoUrl} alt="Defect evidence" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                        <Eye className="w-4 h-4" />
                      </div>
                    </button>
                    <span className="text-xs text-slate-500">Click thumbnail to expand photo evidence</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Zero Defects Recorded!</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            All inspected vehicle items met normal factory specifications. You are ready to proceed with confidence.
          </p>
        </div>
      )}

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Category Breakdown</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">No.</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Total</th>
                <th className="py-2.5 px-3 text-center">Passed</th>
                <th className="py-2.5 px-3 text-center">Rejected</th>
                <th className="py-2.5 px-3 text-center">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {CATEGORIES.map((cat) => {
                const stats = summary.categoryStats[cat.id] || { total: 0, passed: 0, rejected: 0, notChecked: 0 };
                if (stats.total === 0) return null;

                return (
                  <tr key={cat.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{cat.number}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{cat.name}</td>
                    <td className="py-2.5 px-3 text-center font-semibold">{stats.total}</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">{stats.passed}</td>
                    <td className="py-2.5 px-3 text-center text-rose-600 font-bold">
                      {stats.rejected > 0 ? stats.rejected : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-400">
                      {stats.notChecked > 0 ? stats.notChecked : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Download & Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white">
        <div>
          <h3 className="text-base font-bold">Ready to take delivery?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Download your official client-side PDF inspection report for your records and dealer gate pass sign-off.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          <span>Download PDF Report</span>
        </button>
      </div>

      {/* Enlarged Photo Modal */}
      <PhotoModal photoUrl={enlargedPhoto} onClose={() => setEnlargedPhoto(null)} />
    </div>
  );
};
