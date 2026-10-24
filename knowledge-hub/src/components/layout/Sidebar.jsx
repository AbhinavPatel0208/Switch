import {
  HiServer, HiChartBar, HiCube, HiCode,
  HiDatabase, HiCloud, HiAcademicCap, HiViewGrid,
} from 'react-icons/hi';
import { FaJava, FaReact } from 'react-icons/fa';
import { CATEGORIES } from '../../utils/helpers';
import { getStats, getCategoryStats } from '../../utils/helpers';

const iconMap = {
  HiViewGrid, FaReact, HiServer, FaJava, HiChartBar,
  HiCube, HiCode, HiDatabase, HiCloud, HiAcademicCap,
};

function AsciiBar({ pct }) {
  const filled = Math.round(pct / 10);
  const empty = 10 - filled;
  return (
    <span className="text-[11px] tracking-wider">
      <span className="text-[#00ff41]">{'█'.repeat(filled)}</span>
      <span className="text-[#1a3a1a]">{'░'.repeat(empty)}</span>
    </span>
  );
}

export default function Sidebar({ activeCategory, onCategoryChange, allTopics, isOpen, onClose }) {
  const stats = getStats(allTopics);
  const categoryStats = getCategoryStats(allTopics);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)]
        w-68 bg-white/95 dark:bg-[#060a06]/98 backdrop-blur-xl
        border-r border-slate-200/80 dark:border-[#00ff41]/8
        transform transition-all duration-300 ease-in-out
        lg:transform-none overflow-y-auto flex flex-col
        ${isOpen ? 'translate-x-0 shadow-2xl dark:shadow-[#00ff41]/5' : '-translate-x-full lg:translate-x-0'}
      `} style={{ width: '17rem' }}>
        <div className="p-4 space-y-4">

          {/* Light mode progress card */}
          <div className="dark:hidden p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 border border-indigo-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Prep Progress</span>
              <span className="text-xs font-extrabold text-indigo-600 font-mono">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.max(stats.percentage, 2)}%` }} />
            </div>
            <div className="flex items-center justify-between mt-3 text-[11px] font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />{stats.completed} done</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />{stats.inProgress} active</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" />{stats.notStarted} todo</span>
            </div>
          </div>

          {/* Dark / hacker progress card */}
          <div className="hidden dark:block p-3 border border-[#1a3a1a] bg-[#0a120a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#3a7a3a] uppercase tracking-widest">// PREP_STATUS</span>
              <span className="text-[#00ff41] text-xs font-bold">{stats.percentage}%</span>
            </div>
            <AsciiBar pct={stats.percentage} />
            <div className="mt-2.5 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#3a7a3a]">● DONE</span>
                <span className="text-[#00ff41]">{stats.completed}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#3a7a3a]">◉ RUNNING</span>
                <span className="text-[#ffb800]">{stats.inProgress}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#3a7a3a]">○ PENDING</span>
                <span className="text-[#2d5a2d]">{stats.notStarted}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            {/* Light mode label */}
            <p className="dark:hidden px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Knowledge Buckets</p>
            {/* Dark mode label */}
            <p className="hidden dark:block px-1 mb-2 text-[10px] text-[#2d5a2d] tracking-widest">// MODULES</p>

            <ul className="space-y-0.5">
              {CATEGORIES.map((cat, idx) => {
                const IconComponent = iconMap[cat.icon];
                const isActive = activeCategory === cat.key;
                const catStat = cat.key === 'all'
                  ? { total: stats.total, completed: stats.completed }
                  : categoryStats[cat.key] || { total: 0, completed: 0 };
                const isLast = idx === CATEGORIES.length - 1;

                return (
                  <li key={cat.key}>
                    {/* Light mode button */}
                    <button
                      type="button"
                      onClick={() => { onCategoryChange(cat.key); onClose(); }}
                      className={`dark:hidden w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {IconComponent && (
                        <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : ''}`} style={{ color: !isActive ? cat.color : undefined }} />
                      )}
                      <span className="flex-1 text-left truncate">{cat.label}</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>
                        {catStat.completed}/{catStat.total}
                      </span>
                    </button>

                    {/* Dark / hacker button */}
                    <button
                      type="button"
                      onClick={() => { onCategoryChange(cat.key); onClose(); }}
                      className={`hidden dark:flex w-full items-center gap-2 px-2 py-2 text-[11px] transition-colors group ${
                        isActive
                          ? 'text-[#00ff41] bg-[#001a00]/50 border-l-2 border-[#00ff41]'
                          : 'text-[#3a7a3a] hover:text-[#b4ffb4] border-l-2 border-transparent hover:border-[#1a3a1a]'
                      }`}
                    >
                      <span className={`w-3 text-center flex-shrink-0 ${isActive ? 'text-[#00ff41]' : 'text-[#1a3a1a]'}`}>
                        {isActive ? '▶' : (isLast ? '└' : '├')}
                      </span>
                      {IconComponent && (
                        <IconComponent className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? '#00ff41' : '#3a7a3a' }} />
                      )}
                      <span className="flex-1 text-left truncate tracking-wide">{cat.label}</span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#00ff41]' : 'text-[#1a3a1a]'}`}>
                        {catStat.completed}/{catStat.total}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Hacker footer watermark */}
        <div className="hidden dark:block mt-auto p-4 border-t border-[#0d1a0d]">
          <p className="text-[10px] text-[#1a3a1a] tracking-widest">// root@interview-prep:~$</p>
          <p className="text-[10px] text-[#1a3a1a] mt-0.5">sys.version = &apos;1.0.0&apos;</p>
        </div>
      </aside>
    </>
  );
}
