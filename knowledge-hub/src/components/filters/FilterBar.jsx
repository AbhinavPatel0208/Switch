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
  const selectBase = `
    px-3 py-1.5 text-xs font-bold focus:outline-none cursor-pointer transition-colors
    bg-slate-100/80 dark:bg-[#0a120a] border border-slate-200 dark:border-[#1a3a1a]
    rounded-xl dark:rounded-none text-slate-700 dark:text-[#3a7a3a]
    focus:ring-2 focus:ring-indigo-500/40 dark:focus:border-[#00ff41]/30 dark:focus:text-[#b4ffb4]
  `;

  return (
    <div className="space-y-3">
      {/* Main filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white/80 dark:bg-[#0a120a] p-2 sm:p-2.5 rounded-2xl dark:rounded-none border border-slate-200/80 dark:border-[#1a3a1a] shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter icon label */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-[#2d5a2d] px-2">
            <HiFilter className="w-3.5 h-3.5 text-indigo-500 dark:text-[#00ff41]/50" />
            <span className="dark:hidden">Filters</span>
            <span className="hidden dark:inline text-[10px] tracking-widest">FILTER</span>
          </div>

          {/* Subcategory */}
          {availableSubcategories.length > 0 && (
            <select value={activeSubcategory} onChange={(e) => onSubcategoryChange(e.target.value)} className={`${selectBase} dark:text-[#00ff41]/80 dark:border-[#00ff41]/20`}>
              <option value="all">All Subcategories ({availableSubcategories.length})</option>
              {availableSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          )}

          {/* Difficulty */}
          <select value={activeDifficulty} onChange={(e) => onDifficultyChange(e.target.value)} className={selectBase}>
            <option value="all">All Difficulties</option>
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Status */}
          <select value={activeStatus} onChange={(e) => onStatusChange(e.target.value)} className={selectBase}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-[#ff4444] bg-rose-50 dark:bg-[#130000] hover:bg-rose-100 dark:hover:bg-[#1a0000] rounded-xl dark:rounded-none border border-rose-200 dark:border-[#ff4444]/20 transition-colors"
            >
              <HiX className="w-3.5 h-3.5" />
              <span className="dark:hidden">Reset</span>
              <span className="hidden dark:inline">CLR</span>
            </button>
          )}
        </div>

        {/* Right: view mode + count */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center bg-slate-100 dark:bg-[#060a06] p-0.5 rounded-xl dark:rounded-none border border-slate-200 dark:border-[#1a3a1a] text-xs font-bold">
            <button
              type="button"
              onClick={() => onViewModeChange('grouped')}
              title="Grouped by subcategory"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:rounded-none transition-all ${
                viewMode === 'grouped'
                  ? 'bg-white dark:bg-[#001a00] text-indigo-600 dark:text-[#00ff41] shadow-xs dark:shadow-none dark:border dark:border-[#00ff41]/20'
                  : 'text-slate-500 dark:text-[#2d5a2d] hover:text-slate-900 dark:hover:text-[#3a7a3a]'
              }`}
            >
              <HiCollection className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grouped</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('flat')}
              title="Flat grid"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:rounded-none transition-all ${
                viewMode === 'flat'
                  ? 'bg-white dark:bg-[#001a00] text-indigo-600 dark:text-[#00ff41] shadow-xs dark:shadow-none dark:border dark:border-[#00ff41]/20'
                  : 'text-slate-500 dark:text-[#2d5a2d] hover:text-slate-900 dark:hover:text-[#3a7a3a]'
              }`}
            >
              <HiViewGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flat Grid</span>
            </button>
          </div>

          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-[#2d5a2d]">
            <span className="dark:hidden">{topicCount} topics</span>
            <span className="hidden dark:inline text-[#00ff41]/60">{String(topicCount).padStart(3,'0')}<span className="text-[#1a3a1a] ml-1">records</span></span>
          </span>
        </div>
      </div>

      {/* Subcategory pills */}
      {availableSubcategories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[11px] font-bold text-slate-400 dark:text-[#1a3a1a] uppercase tracking-wider mr-1">
            <span className="dark:hidden">Pillars:</span>
            <span className="hidden dark:inline">// SECTIONS:</span>
          </span>
          <button
            type="button"
            onClick={() => onSubcategoryChange('all')}
            className={`px-3 py-1 rounded-xl dark:rounded-none text-xs font-bold transition-all border ${
              activeSubcategory === 'all'
                ? 'bg-indigo-600 dark:bg-[#001a00] text-white dark:text-[#00ff41] border-transparent dark:border-[#00ff41]/30 shadow-xs'
                : 'bg-white dark:bg-[#0a120a] text-slate-600 dark:text-[#2d5a2d] border-slate-200/80 dark:border-[#1a3a1a] hover:bg-slate-100 dark:hover:border-[#00ff41]/20 dark:hover:text-[#3a7a3a]'
            }`}
          >
            ALL
          </button>
          {availableSubcategories.map(sub => (
            <button
              key={sub}
              type="button"
              onClick={() => onSubcategoryChange(sub)}
              className={`px-3 py-1 rounded-xl dark:rounded-none text-xs font-bold transition-all border ${
                activeSubcategory === sub
                  ? 'bg-indigo-600 dark:bg-[#001a00] text-white dark:text-[#00ff41] border-transparent dark:border-[#00ff41]/30 shadow-xs'
                  : 'bg-white dark:bg-[#0a120a] text-slate-600 dark:text-[#2d5a2d] border-slate-200/80 dark:border-[#1a3a1a] hover:bg-slate-100 dark:hover:border-[#00ff41]/20 dark:hover:text-[#3a7a3a]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Tag pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[11px] font-bold text-slate-400 dark:text-[#1a3a1a] uppercase tracking-wider mr-1">
            <span className="dark:hidden">Tags:</span>
            <span className="hidden dark:inline">// TAGS:</span>
          </span>
          {allTags.slice(0, 14).map(tag => {
            const isSelected = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={`px-2.5 py-0.5 text-[10px] font-medium rounded-lg dark:rounded-none transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 dark:bg-[#001a00] text-white dark:text-[#00ff41] border-transparent dark:border-[#00ff41]/30 shadow-xs'
                    : 'bg-white dark:bg-[#0a120a] text-slate-600 dark:text-[#1a3a1a] border-slate-200/80 dark:border-[#1a3a1a] hover:text-slate-900 dark:hover:text-[#3a7a3a] dark:hover:border-[#00ff41]/15'
                }`}
              >
                <span className="dark:hidden">#{tag}</span>
                <span className="hidden dark:inline">[{tag}]</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
