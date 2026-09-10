import { useState, useMemo } from 'react';
import { ChecklistItem, InspectionSession, InspectionSummary } from '../types/pdi';
import { CATEGORIES } from '../data/categories';
import { getApplicableChecks, recordCheckResult } from '../services/storage';
import { CategorySidebar } from '../components/CategorySidebar';
import { ProgressBar } from '../components/ProgressBar';
import { ChecklistCard } from '../components/ChecklistCard';
import { RejectionModal } from '../components/RejectionModal';
import { PhotoModal } from '../components/PhotoModal';
import { QuickNav } from '../components/QuickNav';
import { SearchFilterBar } from '../components/SearchFilterBar';
import {
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface InspectionPageProps {
  session: InspectionSession;
  summary: InspectionSummary;
  onUpdateSession: (updatedSession: InspectionSession) => void;
  onGoToReview: () => void;
  isMobileSidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
}

export const InspectionPage: React.FC<InspectionPageProps> = ({
  session,
  summary,
  onUpdateSession,
  onGoToReview,
  isMobileSidebarOpen,
  onCloseMobileSidebar
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cat-01');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Modal states
  const [rejectionTargetItem, setRejectionTargetItem] = useState<ChecklistItem | null>(null);
  const [enlargedPhotoUrl, setEnlargedPhotoUrl] = useState<string | null>(null);

  // Applicable checks for this vehicle
  const applicableChecks = useMemo(() => {
    return getApplicableChecks(session.vehicle);
  }, [session.vehicle]);
  const readOnly = Boolean(session.isCompleted || summary.notChecked === 0);

  // Current category object
  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];
  }, [selectedCategoryId]);

  // Filtered checks list
  const displayedChecks = useMemo(() => {
    let list = applicableChecks;

    // Filter by category if no search query is active
    if (!searchQuery.trim()) {
      list = list.filter((item) => item.categoryId === selectedCategoryId);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.whatToCheck.toLowerCase().includes(q) ||
          item.whereToFind.toLowerCase().includes(q) ||
          item.normalCondition.toLowerCase().includes(q) ||
          item.rejectCondition.toLowerCase().includes(q)
      );
    }

    // Filter by status / severity
    if (activeFilter === 'passed') {
      list = list.filter((item) => session.results[item.id]?.status === 'passed');
    } else if (activeFilter === 'rejected') {
      list = list.filter((item) => session.results[item.id]?.status === 'rejected');
    } else if (activeFilter === 'not_checked') {
      list = list.filter((item) => !session.results[item.id] || session.results[item.id]?.status === 'not_checked');
    } else if (activeFilter === 'critical') {
      list = list.filter((item) => item.severity === 'critical');
    } else if (activeFilter === 'major') {
      list = list.filter((item) => item.severity === 'major');
    } else if (activeFilter === 'minor') {
      list = list.filter((item) => item.severity === 'minor');
    }

    return list;
  }, [applicableChecks, selectedCategoryId, searchQuery, activeFilter, session.results]);

  // Handle Mark Pass
  const handlePass = (itemId: string) => {
    if (readOnly) return;
    const updated = recordCheckResult(session.id, itemId, { status: 'passed' });
    if (updated) onUpdateSession(updated);
  };

  // Handle Mark Reject (opens modal)
  const handleOpenReject = (item: ChecklistItem) => {
    if (readOnly) return;
    setRejectionTargetItem(item);
  };

  const handleConfirmReject = (itemId: string, notes: string, photoUrl?: string) => {
    if (readOnly) return;
    const updated = recordCheckResult(session.id, itemId, {
      status: 'rejected',
      notes,
      photoUrl
    });
    if (updated) onUpdateSession(updated);
  };

  // Handle Reset to Not Checked
  const handleReset = (itemId: string) => {
    if (readOnly) return;
    const updated = recordCheckResult(session.id, itemId, {
      status: 'not_checked',
      notes: undefined,
      photoUrl: undefined
    });
    if (updated) onUpdateSession(updated);
  };

  // Handle Notes Update
  const handleUpdateNotes = (itemId: string, notes: string) => {
    if (readOnly) return;
    const updated = recordCheckResult(session.id, itemId, { notes });
    if (updated) onUpdateSession(updated);
  };

  // Handle Remove Photo
  const handleRemovePhoto = (itemId: string) => {
    if (readOnly) return;
    const updated = recordCheckResult(session.id, itemId, { photoUrl: undefined });
    if (updated) onUpdateSession(updated);
  };

  // Fast Navigation: Find next uncompleted check or advance category
  const handlePassAndNext = (itemId: string) => {
    handlePass(itemId);

    // Find next check in current category
    const currentIndex = displayedChecks.findIndex((item) => item.id === itemId);
    if (currentIndex >= 0 && currentIndex < displayedChecks.length - 1) {
      // scroll to next check or let user see next
    } else {
      // If at end of category, advance to next category
      const currentCatIdx = CATEGORIES.findIndex((c) => c.id === selectedCategoryId);
      if (currentCatIdx >= 0 && currentCatIdx < CATEGORIES.length - 1) {
        setSelectedCategoryId(CATEGORIES[currentCatIdx + 1].id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const currentCategoryIdx = CATEGORIES.findIndex((c) => c.id === selectedCategoryId);
  const hasPreviousCategory = currentCategoryIdx > 0;
  const hasNextCategory = currentCategoryIdx < CATEGORIES.length - 1;

  const handlePreviousCategory = () => {
    if (hasPreviousCategory) {
      setSelectedCategoryId(CATEGORIES[currentCategoryIdx - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextCategory = () => {
    if (hasNextCategory) {
      setSelectedCategoryId(CATEGORIES[currentCategoryIdx + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onGoToReview();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-slate-50">
      {/* Category Sidebar (Desktop + Mobile Drawer) */}
      <CategorySidebar
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        summary={summary}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={onCloseMobileSidebar}
      />

      {/* Main Inspection Workspace */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Orientation Breadcrumb: Where am I? What am I checking? */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{session.vehicle.manufacturer} {session.vehicle.model}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-sky-700">Category {currentCategory.number}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-bold truncate">{currentCategory.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentCategory.number} — {currentCategory.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">{currentCategory.description}</p>
            </div>

            {/* Category Completion Progress Tag */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                {summary.categoryStats[currentCategory.id]?.passed || 0} /{' '}
                {summary.categoryStats[currentCategory.id]?.total || 0} Done
              </span>
            </div>
          </div>
        </div>

        {/* Compact Progress Dashboard & Filter Bar */}
        <ProgressBar
          summary={summary}
          activeFilter={activeFilter}
          onSelectFilter={(f) => setActiveFilter(f)}
        />

        {/* Search & Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Active Inspection Checklist Cards */}
        {displayedChecks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No checks match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset the filter to view all checks in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {displayedChecks.map((item, idx) => (
              <ChecklistCard
                key={item.id}
                item={item}
                index={idx}
                result={session.results[item.id]}
                onPass={handlePass}
                onReject={handleOpenReject}
                onReset={handleReset}
                onUpdateNotes={handleUpdateNotes}
                onPassAndNext={handlePassAndNext}
                onViewPhoto={(url) => setEnlargedPhotoUrl(url)}
                onRemovePhoto={handleRemovePhoto}
                readOnly={readOnly}
              />
            ))}

            {/* End of Category Transition Banner */}
            {!searchQuery && (
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Category {currentCategory.number} Finished?</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {hasNextCategory
                      ? `Proceed to Step ${CATEGORIES[currentCategoryIdx + 1].number}: ${
                          CATEGORIES[currentCategoryIdx + 1].name
                        }`
                      : 'All categories checked! Proceed to Final Review & Report generation.'}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {hasNextCategory ? (
                    <button
                      type="button"
                      onClick={handleNextCategory}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Next Category</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onGoToReview}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Review & Sign-off</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Right Summary & Jump Sidebar (Desktop only) */}
      <aside className="hidden xl:block w-72 h-[calc(100vh-4rem)] sticky top-16 bg-white border-l border-slate-200 p-5 space-y-5 overflow-y-auto">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Inspection Summary</h3>
          <p className="text-sm font-bold text-slate-900 mt-1">
            {summary.passed + summary.rejected} of {summary.total} Completed
          </p>
        </div>

        {/* Critical / Major callout in right panel */}
        {summary.criticalIssues > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Issues: {summary.criticalIssues}</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-tight">
              Action recommended before taking vehicle delivery.
            </p>
          </div>
        )}

        {/* Quick jump buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Navigation</span>

          <button
            type="button"
            onClick={() => {
              setActiveFilter('not_checked');
              setSearchQuery('');
            }}
            className="w-full text-left p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-200/80 flex items-center justify-between"
          >
            <span>Remaining Checks</span>
            <span className="font-bold text-sky-600">{summary.notChecked}</span>
          </button>

          {summary.rejected > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter('rejected');
                setSearchQuery('');
              }}
              className="w-full text-left p-2.5 rounded-xl text-xs font-medium text-rose-700 hover:bg-rose-50 border border-rose-200 flex items-center justify-between"
            >
              <span>Rejected Items</span>
              <span className="font-bold">{summary.rejected}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onGoToReview}
            className="w-full text-center py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Go to Final Review</span>
          </button>
        </div>
      </aside>

      {/* Sticky Bottom Quick Navigation Bar for Mobile and Fast Inspections */}
      <QuickNav
        onPrevious={handlePreviousCategory}
        onNext={handleNextCategory}
        onPassAndNext={() => {
          // If checks displayed, pass first not-checked item or first item
          const firstUnchecked = displayedChecks.find(
            (c) => !session.results[c.id] || session.results[c.id].status === 'not_checked'
          );
          if (firstUnchecked) {
            handlePassAndNext(firstUnchecked.id);
          } else {
            handleNextCategory();
          }
        }}
        onRejectCurrent={() => {
          const firstUnchecked = displayedChecks.find(
            (c) => !session.results[c.id] || session.results[c.id].status === 'not_checked'
          );
          if (firstUnchecked) {
            handleOpenReject(firstUnchecked);
          } else if (displayedChecks.length > 0) {
            handleOpenReject(displayedChecks[0]);
          }
        }}
        onSkip={handleNextCategory}
        hasPrevious={hasPreviousCategory}
        hasNext={hasNextCategory || true}
        stepIndex={currentCategoryIdx + 1}
        totalSteps={CATEGORIES.length}
        readOnly={readOnly}
      />

      {/* Rejection Modal */}
      <RejectionModal
        item={rejectionTargetItem}
        isOpen={Boolean(rejectionTargetItem)}
        initialNotes={rejectionTargetItem ? session.results[rejectionTargetItem.id]?.notes : ''}
        initialPhotoUrl={rejectionTargetItem ? session.results[rejectionTargetItem.id]?.photoUrl : undefined}
        onClose={() => setRejectionTargetItem(null)}
        onConfirm={handleConfirmReject}
      />

      {/* Enlarged Photo Modal */}
      <PhotoModal
        photoUrl={enlargedPhotoUrl}
        onClose={() => setEnlargedPhotoUrl(null)}
      />
    </div>
  );
};
