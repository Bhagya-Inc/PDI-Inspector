import React from 'react';
import { Category, InspectionSummary } from '../types/pdi';
import { CATEGORIES } from '../data/categories';
import { CheckCircle2, XCircle, CircleDashed, X } from 'lucide-react';

interface CategorySidebarProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  summary: InspectionSummary;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategoryId,
  onSelectCategory,
  summary,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const content = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Inspection Sequence</h2>
          <p className="text-xs text-slate-500">28 Logical Steps</p>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {CATEGORIES.map((cat: Category) => {
          const stats = summary.categoryStats[cat.id] || { total: 0, passed: 0, rejected: 0, notChecked: 0 };
          const isSelected = selectedCategoryId === cat.id;
          const isFinished = stats.total > 0 && stats.notChecked === 0;
          const hasRejection = stats.rejected > 0;
          const hasStarted = stats.passed > 0 || stats.rejected > 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.id);
                onCloseMobile?.();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-sky-50 text-sky-900 border border-sky-200 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span
                  className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-sky-200/70 text-sky-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.number}
                </span>
                <span className="text-xs truncate">{cat.name}</span>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0 flex items-center gap-1.5">
                {stats.total === 0 ? (
                  <span className="text-[10px] text-slate-400">N/A</span>
                ) : hasRejection ? (
                  <span className="flex items-center gap-0.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    <XCircle className="w-3 h-3" />
                    {stats.rejected}
                  </span>
                ) : isFinished ? (
                  <span className="text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : hasStarted ? (
                  <span className="text-[10px] font-medium text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                    {stats.passed + stats.rejected}/{stats.total}
                  </span>
                ) : (
                  <span className="text-slate-300">
                    <CircleDashed className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 bg-white border-r border-slate-200 shadow-xs">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
