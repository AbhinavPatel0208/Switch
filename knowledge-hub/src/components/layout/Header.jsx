import { useState } from 'react';
import {
  HiSearch,
  HiMenuAlt2,
  HiX,
  HiSun,
  HiMoon,
} from 'react-icons/hi';

export default function Header({
  searchQuery,
  onSearchChange,
  onToggleSidebar,
  sidebarOpen,
  theme,
  onToggleTheme,
}) {
  const [focused, setFocused] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation"
            >
              {sidebarOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt2 className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-black text-base tracking-tight">K</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  Knowledge<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Center: Search Bar with Aesthetic Focus & Shortcut pill */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className={`relative transition-all duration-200 ${
              focused 
                ? 'ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10 rounded-xl' 
                : ''
            }`}>
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search algorithms, patterns, Kafka, Flink, SQL..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full pl-10 pr-9 py-2 bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <HiX className="w-4 h-4" />
                </button>
              ) : (
                <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/60">
                  /
                </span>
              )}
            </div>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 shadow-sm transition-all"
              aria-label="Toggle Light and Dark Mode"
            >
              {isDark ? (
                <HiSun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <HiMoon className="w-4 h-4 text-slate-700 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
