import { useState, useMemo, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { HiSearch, HiMenuAlt2, HiX } from 'react-icons/hi';
import { DIFFICULTY_CONFIG } from '../../utils/helpers';

const DIFF_COLORS = {
  easy:   'text-emerald-600 dark:text-[#00ff41]   border-emerald-200 dark:border-[#00ff41]/20   bg-emerald-50/80 dark:bg-[#001200]',
  medium: 'text-amber-600  dark:text-[#ffb800]    border-amber-200  dark:border-[#ffb800]/20   bg-amber-50/80  dark:bg-[#120e00]',
  hard:   'text-rose-600   dark:text-[#ff4444]    border-rose-200   dark:border-[#ff4444]/20   bg-rose-50/80   dark:bg-[#130000]',
  expert: 'text-purple-600 dark:text-[#cc44ff]    border-purple-200 dark:border-[#cc44ff]/20   bg-purple-50/80 dark:bg-[#0d0015]',
};

export default function Header({
  searchQuery,
  onSearchChange,
  onToggleSidebar,
  sidebarOpen,
  theme,
  onToggleTheme,
  allTopics = [],
  onTopicSelect,
}) {
  const [focused, setFocused]           = useState(false);
  const [showDrop, setShowDrop]         = useState(false);
  const [activeIdx, setActiveIdx]       = useState(-1);
  const wrapperRef                      = useRef(null);
  const inputRef                        = useRef(null);
  const isDark = theme === 'dark';

  /* ── Fuse index (rebuilt only when allTopics changes) ── */
  const fuse = useMemo(() => new Fuse(allTopics, {
    keys: [
      { name: 'title',       weight: 0.5  },
      { name: 'tags',        weight: 0.25 },
      { name: 'subcategory', weight: 0.15 },
      { name: 'summary',     weight: 0.1  },
    ],
    threshold: 0.35,
    includeScore: true,
  }), [allTopics]);

  /* ── Suggestions list (up to 8) ── */
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).slice(0, 8).map(r => r.item);
  }, [fuse, searchQuery]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDrop(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, []);

  /* ── Select a suggestion ── */
  const handleSelect = (topic) => {
    onTopicSelect(topic);
    onSearchChange(topic.title);
    setShowDrop(false);
    setActiveIdx(-1);
    inputRef.current?.blur();
  };

  /* ── Keyboard navigation in input ── */
  const handleKeyDown = (e) => {
    if (!showDrop || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIdx]);
    } else if (e.key === 'Escape') {
      setShowDrop(false);
      setActiveIdx(-1);
    }
  };

  const dropVisible = showDrop && suggestions.length > 0;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#060a06]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#00ff41]/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-2 sm:gap-3">

          {/* ── Left: Hamburger + Logo ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-[#3a7a3a] hover:text-slate-900 dark:hover:text-[#00ff41] hover:bg-slate-100 dark:hover:bg-[#0d150d] border border-transparent dark:hover:border-[#1a3a1a] transition-colors"
              aria-label="Toggle Navigation"
            >
              {sidebarOpen ? <HiX className="w-4 h-4" /> : <HiMenuAlt2 className="w-4 h-4" />}
            </button>

            {/* Light logo */}
            <div className="dark:hidden flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="hidden sm:block text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
                Knowledge<span className="text-indigo-600">Hub</span>
              </span>
            </div>

            {/* Hacker logo */}
            <div className="hidden dark:flex items-center gap-1.5 select-none">
              <span className="text-[#00ff41]/30 text-sm">[</span>
              <span className="text-[#00ff41] font-bold text-sm tracking-widest hack-glow-text hidden sm:inline">KnowledgeHub</span>
              <span className="text-[#00ff41] font-bold text-sm tracking-widest hack-glow-text sm:hidden">KH</span>
              <span className="text-[#00ff41]/30 text-sm">]</span>
              <span className="terminal-cursor hidden sm:inline" />
            </div>
          </div>

          {/* ── Center: Search + Suggestions ── */}
          <div className="flex-1 min-w-0 mx-2 sm:mx-4 relative" ref={wrapperRef}>

            {/* Light mode search */}
            <div className={`dark:hidden relative transition-all duration-200 ${
              focused ? 'ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10 rounded-xl' : ''
            }`}>
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search topics, tags, patterns..."
                value={searchQuery}
                onChange={(e) => { onSearchChange(e.target.value); setShowDrop(true); setActiveIdx(-1); }}
                onFocus={() => { setFocused(true); setShowDrop(true); }}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="w-full pl-9 pr-8 py-2 bg-slate-100/90 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all"
              />
              {searchQuery ? (
                <button type="button" onClick={() => { onSearchChange(''); setShowDrop(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <HiX className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-500 border border-slate-300/60">/</span>
              )}
            </div>

            {/* Dark / terminal search */}
            <div className="hidden dark:block relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ff41]/40 text-xs select-none pointer-events-none">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="search --query ..."
                value={searchQuery}
                onChange={(e) => { onSearchChange(e.target.value); setShowDrop(true); setActiveIdx(-1); }}
                onFocus={() => { setFocused(true); setShowDrop(true); }}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className={`w-full pl-7 pr-8 py-1.5 bg-[#0d150d] border text-xs text-[#b4ffb4] placeholder-[#2d5a2d] focus:outline-none transition-all rounded-sm ${
                  focused ? 'border-[#00ff41]/40 shadow-[0_0_12px_rgba(0,255,65,0.08)]' : 'border-[#1a3a1a]'
                }`}
              />
              {searchQuery ? (
                <button type="button" onClick={() => { onSearchChange(''); setShowDrop(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#3a7a3a] hover:text-[#00ff41] transition-colors">
                  <HiX className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#2d5a2d] border border-[#1a3a1a] px-1 py-0.5">/</span>
              )}
            </div>

            {/* ── Suggestions Dropdown ── */}
            {dropVisible && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 overflow-hidden rounded-xl dark:rounded-none border border-slate-200 dark:border-[#1a3a1a] bg-white dark:bg-[#0a120a] shadow-2xl dark:shadow-none">
                <ul role="listbox" aria-label="Search suggestions">
                  {suggestions.map((topic, idx) => {
                    const isActive = idx === activeIdx;
                    const diffColor = DIFF_COLORS[topic.difficulty] || DIFF_COLORS.medium;
                    return (
                      <li key={topic.id} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          /* mousedown fires before blur — prevents dropdown closing before click registers */
                          onMouseDown={(e) => { e.preventDefault(); handleSelect(topic); }}
                          onTouchEnd={(e) => { e.preventDefault(); handleSelect(topic); }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center gap-3 transition-colors border-l-2 ${
                            isActive
                              ? 'bg-indigo-50 dark:bg-[#001a00] border-indigo-500 dark:border-[#00ff41]'
                              : 'border-transparent hover:bg-slate-50 dark:hover:bg-[#0d1a0d]'
                          }`}
                        >
                          {/* Search icon indicator */}
                          <HiSearch className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-indigo-500 dark:text-[#00ff41]' : 'text-slate-300 dark:text-[#1a3a1a]'}`} />

                          {/* Title + meta */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold truncate ${isActive ? 'text-indigo-700 dark:text-[#00ff41]' : 'text-slate-800 dark:text-[#b4ffb4]'}`}>
                              {topic.title}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-[#2d5a2d] truncate mt-0.5">
                              <span className="dark:hidden">{topic.category} · {topic.subcategory}</span>
                              <span className="hidden dark:inline">// {topic.category} / {topic.subcategory}</span>
                            </p>
                          </div>

                          {/* Difficulty badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 border flex-shrink-0 rounded dark:rounded-none ${diffColor}`}>
                            <span className="dark:hidden">{DIFFICULTY_CONFIG[topic.difficulty]?.label ?? topic.difficulty}</span>
                            <span className="hidden dark:inline">{DIFFICULTY_CONFIG[topic.difficulty]?.hackLabel ?? topic.difficulty}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer hint */}
                <div className="px-3.5 py-1.5 border-t border-slate-100 dark:border-[#1a3a1a] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-[#1a3a1a]">
                    <span className="dark:hidden">{suggestions.length} result{suggestions.length !== 1 ? 's' : ''} · ↑↓ navigate · Enter to open</span>
                    <span className="hidden dark:inline">// {suggestions.length} matches | ↑↓ nav | ENTER open | ESC close</span>
                  </span>
                  <span className="text-[10px] text-slate-300 dark:text-[#1a3a1a]">ESC</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Theme Toggle ── */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              className="dark:hidden px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-100/80 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all whitespace-nowrap"
            >
              {isDark ? '☀ Light' : '◉ Dark'}
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="hidden dark:flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold border border-[#1a3a1a] hover:border-[#00ff41]/30 bg-[#0d150d] text-[#3a7a3a] hover:text-[#00ff41] transition-colors rounded-sm whitespace-nowrap"
            >
              <span className="text-[#00ff41]/40">[</span>
              <span>STEALTH</span>
              <span className="text-[#00ff41]/40">]</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
