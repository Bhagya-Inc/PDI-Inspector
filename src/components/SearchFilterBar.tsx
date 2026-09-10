import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'passed', label: '✓ Passed' },
    { id: 'rejected', label: '✕ Rejected' },
    { id: 'not_checked', label: '○ Not Checked' },
    { id: 'critical', label: '⚠ Critical' },
    { id: 'major', label: 'Major' },
    { id: 'minor', label: 'Minor' }
  ];

  return (
    <div className="space-y-2.5">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search checks by keyword (e.g. tyre, VIN, paint, coolant, AC, brake)..."
          className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
