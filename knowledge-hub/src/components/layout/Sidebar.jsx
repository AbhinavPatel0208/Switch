import {
  HiServer,
  HiChartBar,
  HiCube,
  HiCode,
  HiDatabase,
  HiCloud,
  HiAcademicCap,
  HiViewGrid,
} from 'react-icons/hi';
import { FaJava, FaReact } from 'react-icons/fa';
import { CATEGORIES } from '../../utils/helpers';
import { getStats, getCategoryStats } from '../../utils/helpers';

const iconMap = {
  HiViewGrid,
  FaReact,
  HiServer,
  FaJava,
  HiChartBar,
  HiCube,
  HiCode,
  HiDatabase,
  HiCloud,
  HiAcademicCap,
};

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  allTopics,
  isOpen,
  onClose,
}) {
  const stats = getStats(allTopics);
  const categoryStats = getCategoryStats(allTopics);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)]
          w-72 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80
          transform transition-all duration-300 ease-in-out
          lg:transform-none overflow-y-auto flex flex-col justify-between
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 space-y-4">
          {/* Progress Overview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900/40 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Prep Progress
              </span>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                {stats.percentage}%
              </span>
            </div>
            
            {/* Progress bar with animated shine */}
            <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500 shadow-sm shadow-indigo-500/50"
                style={{ width: `${Math.max(stats.percentage, 2)}%` }}
              />
            </div>

            {/* Micro stats counter */}
            <div className="flex items-center justify-between mt-3 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{stats.completed} done</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{stats.inProgress} reading</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{stats.notStarted} todo</span>
              </span>
            </div>
          </div>

          {/* Category Navigation */}
          <nav>
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Knowledge Buckets
            </p>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon];
                const isActive = activeCategory === cat.key;
                const catStat = cat.key === 'all'
                  ? { total: stats.total, completed: stats.completed }
                  : categoryStats[cat.key] || { total: 0, completed: 0 };

                return (
                  <li key={cat.key}>
                    <button
                      type="button"
                      onClick={() => {
                        onCategoryChange(cat.key);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold
                        transition-all duration-150 group
                        ${isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                        }
                      `}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : ''
                          }`}
                          style={{ color: !isActive ? cat.color : undefined }}
                        />
                      )}
                      <span className="flex-1 text-left truncate">{cat.label}</span>
                      <span className={`
                        text-[11px] font-mono px-2 py-0.5 rounded-md transition-colors
                        ${isActive 
                          ? 'bg-white/20 text-white font-bold' 
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
                        }
                      `}>
                        {catStat.completed}/{catStat.total}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
