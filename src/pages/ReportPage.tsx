import React from 'react';
import { InspectionSession, InspectionSummary } from '../types/pdi';
import { CATEGORIES } from '../data/categories';
import { getApplicableChecks } from '../services/storage';
import { generatePdfReport } from '../services/pdfGenerator';
import { formatReportTimestamp } from '../services/dateUtils';
import { ArrowLeft, FileDown, Printer, ShieldAlert } from 'lucide-react';

interface ReportPageProps {
  session: InspectionSession;
  summary: InspectionSummary;
  onBack: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ session, summary, onBack }) => {
  const v = session.vehicle;
  const applicableChecks = getApplicableChecks(v);

  const rejectedItems = applicableChecks
    .filter((item) => session.results[item.id]?.status === 'rejected')
    .map((item) => {
      const res = session.results[item.id];
      const cat = CATEGORIES.find((c) => c.id === item.categoryId);
      return {
        item,
        category: cat,
        notes: res?.notes || 'No specific notes recorded.',
        photoUrl: res?.photoUrl
      };
    });

  const criticalIssues = rejectedItems.filter((r) => r.item.severity === 'critical');

  const handleDownload = () => {
    generatePdfReport(session, summary);
  };

  const handlePrint = () => {
    window.print();
  };

  const reportTimestamp = formatReportTimestamp(session.updatedAt);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex items-center justify-between print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Review</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-900 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img src="/apple-touch-icon.png" alt="PDI Inspector logo" className="w-14 h-14 rounded-xl" />
              <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">Official Customer PDI Audit</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                VEHICLE PRE-DELIVERY INSPECTION REPORT
              </h1>
              <p className="text-xs text-slate-500 mt-1">Pre-Delivery Quality & Compliance Verification</p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-0.5 min-w-[150px]">
              <p className="font-semibold text-slate-800">Inspector: {v.inspectorName || 'Customer'}</p>
              <p>Generated: {reportTimestamp}</p>
              <p>Status: {summary.decision}</p>
            </div>
          </div>
        </div>

        {/* 1. Vehicle Information Table */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            1. Vehicle & Identification Specifications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Manufacturer</span>
              <span className="font-bold text-slate-900">{v.manufacturer}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Model & Variant</span>
              <span className="font-bold text-slate-900">{v.model} {v.variant}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Fuel Type</span>
              <span className="font-bold text-slate-900">{v.fuelTypes.join(' + ')}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Transmission</span>
              <span className="font-bold text-slate-900">{v.transmission}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Colour</span>
              <span className="font-bold text-slate-900">{v.color}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">VIN / Chassis</span>
              <span className="font-bold font-mono text-slate-900">{v.vin || 'Not Recorded'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Engine Number</span>
              <span className="font-bold font-mono text-slate-900">{v.engineNumber || 'Not Recorded'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Odometer Reading</span>
              <span className="font-bold text-slate-900">{v.odometerReading ? `${v.odometerReading} km` : 'Not Recorded'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Manufacturing Date</span>
              <span className="font-bold text-slate-900">{v.manufacturingMonthYear || 'Not Recorded'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Dealership</span>
              <span className="font-bold text-slate-900">{v.dealerName || 'Authorized Dealership'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Inspector Name</span>
              <span className="font-bold text-slate-900">{v.inspectorName || 'Customer'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Registration</span>
              <span className="font-bold text-slate-900">{v.registrationNumber || 'Pending'}</span>
            </div>
          </div>
        </section>

        {/* 2. Executive Decision Banner */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            2. Executive Audit Outcome
          </h2>
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Overall Result</span>
              <span className="text-lg font-black">{summary.decision}</span>
              <p className="text-xs text-slate-300 mt-1">{summary.decisionExplanation}</p>
            </div>
            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 text-xs space-y-0.5">
              <p className="text-emerald-400 font-bold">{summary.passed} Passed Checks</p>
              <p className="text-rose-400 font-bold">{summary.rejected} Rejected Issues</p>
              <p className="text-slate-400">{summary.notChecked} Unchecked</p>
            </div>
          </div>
        </section>

        {/* Critical Alerts if any */}
        {criticalIssues.length > 0 && (
          <section className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Critical Defects Identified
              </h3>
            </div>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {criticalIssues.map((cr) => (
                <li key={cr.item.id} className="font-semibold">
                  [{cr.category?.name}] {cr.item.title}: {cr.notes}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. Rejected Items Table */}
        {rejectedItems.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              3. Recorded Defect Log ({rejectedItems.length} Items)
            </h2>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Check</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {rejectedItems.map((r, idx) => (
                    <tr key={r.item.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono">{idx + 1}</td>
                      <td className="py-2 px-3 text-slate-600">{r.category?.name}</td>
                      <td className="py-2 px-3 font-bold">{r.item.title}</td>
                      <td className="py-2 px-3 uppercase text-[10px] font-bold">
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            r.item.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : r.item.severity === 'major'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {r.item.severity}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-rose-600 font-bold">REJECT</td>
                      <td className="py-2 px-3 text-slate-700 italic">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. Photo Evidence Appendix */}
        {rejectedItems.some((r) => Boolean(r.photoUrl)) && (
          <section className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              4. Photographic Evidence Appendix
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {rejectedItems
                .filter((r) => Boolean(r.photoUrl))
                .map((r, idx) => (
                  <div key={r.item.id} className="p-3 border border-slate-200 rounded-2xl bg-slate-50 space-y-2">
                    <img src={r.photoUrl} alt="Photo evidence" className="w-full h-32 object-cover rounded-xl border" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Photo #{idx + 1}</span>
                      <p className="text-xs font-bold text-slate-900 truncate">{r.item.title}</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{r.notes}</p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* 5. Declaration & Signature Block */}
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            This report records visual and operational observations made during a customer-performed pre-delivery inspection.
            It does not constitute a legal or mechanical workshop warranty. Any unrectified issues should be documented in
            writing on the official Dealership Delivery Challan.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border border-slate-200 rounded-2xl p-4 space-y-6">
              <span className="text-xs font-bold uppercase text-slate-800 block">Customer / Inspector</span>
              <div className="border-b border-slate-300 pt-8" />
              <div className="text-xs text-slate-600 space-y-0.5">
                <p>Name: {v.inspectorName || 'Customer'}</p>
                <p>Timestamp: {reportTimestamp}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 space-y-6">
              <span className="text-xs font-bold uppercase text-slate-800 block">Dealer Representative</span>
              <div className="border-b border-slate-300 pt-8" />
              <div className="text-xs text-slate-600 space-y-0.5">
                <p>Dealership: {v.dealerName || 'Authorized Dealership'}</p>
                <p>Timestamp: {reportTimestamp}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
