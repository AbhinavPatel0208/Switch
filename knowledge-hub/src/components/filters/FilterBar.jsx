import { HiFilter, HiX, HiViewGrid, HiCollection } from 'react-icons/hi';
import { DIFFICULTY_CONFIG, STATUS_CONFIG } from '../../utils/helpers';

export default function FilterBar({
  activeCategory,
  activeSubcategory,
  onSubcategoryChange,
  availableSubcategories = [],
  activeDifficulty,
  onDifficultyChange,
  activeStatus,
  onStatusChange,
  activeTags,
  onToggleTag,
  allTags,
  hasActiveFilters,
  onClearFilters,
  topicCount,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="space-y-3.5">
      {/* Primary Filter Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white/80 dark:bg-slate-900/60 p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 px-2">
            <HiFilter className="w-3.5 h-3.5 text-indigo-500" />
            <span>Filters</span>
          </div>

          {/* Subcategory Filter (React, Angular, PostgreSQL, MySQL...) */}
          {availableSubcategories.length > 0 && (
            <select
              value={activeSubcategory}
              onChange={(e) => onSubcategoryChange(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer transition-colors"
            >
              <option value="all">All Subcategories ({availableSubcategories.length})</option>
              {availableSubcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          {/* Difficulty Filter */}
          <select
            value={activeDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer transition-colors"
          >
            <option value="all">All Difficulties</option>
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer transition-colors"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl border border-rose-200 dark:border-rose-900/60 transition-colors"
            >
              <HiX className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Right: View Mode Toggle & Total Count */}
        <div className="flex items-center gap-3 px-2">
          {/* View Mode Toggle: Grouped vs Flat */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-bold">
            <button
              type="button"
              onClick={() => onViewModeChange('grouped')}
              title="Hierarchical Sections: Grouped by Subcategory (React, Angular, etc.)"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'grouped'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <HiCollection className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grouped</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('flat')}
              title="Flat Grid View"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'flat'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <HiViewGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flat Grid</span>
            </button>
          </div>

          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            {topicCount} topics
          </span>
        </div>
      </div>

      {/* Subcategory Quick Pills (When in a specific category) */}
      {availableSubcategories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Pillars:
          </span>
          <button
            type="button"
            onClick={() => onSubcategoryChange('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubcategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Subcategories
          </button>
          {availableSubcategories.map(sub => (
            <button
              key={sub}
              type="button"
              onClick={() => onSubcategoryChange(sub)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeSubcategory === sub
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Tag Pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Tags:
          </span>
          {allTags.slice(0, 14).map(tag => {
            const isSelected = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={`
                  px-2.5 py-0.5 text-[10px] font-medium rounded-lg transition-all
                  ${isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }
                `}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
