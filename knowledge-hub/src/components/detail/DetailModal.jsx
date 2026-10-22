import { useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  HiX,
  HiExternalLink,
  HiLightBulb,
  HiChevronLeft,
  HiChevronRight,
  HiCheck,
} from 'react-icons/hi';
import { DIFFICULTY_CONFIG, STATUS_CONFIG, getCategoryColor } from '../../utils/helpers';

export default function DetailModal({
  topic,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onStatusChange,
  onToggleCompleted,
}) {
  const diffConfig = DIFFICULTY_CONFIG[topic.difficulty] || DIFFICULTY_CONFIG.medium;
  const statusConfig = STATUS_CONFIG[topic.status] || STATUS_CONFIG['not-started'];
  const categoryColor = getCategoryColor(topic.category);
  const isCompleted = topic.status === 'completed';

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    if (e.key === 'ArrowRight' && hasNext) onNext();
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 pb-6 px-3 sm:px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[calc(100vh-3rem)] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-colors duration-200">
        
        {/* Modal Header */}
        <div className="flex-shrink-0 border-b border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-7 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div
                className="w-12 h-1.5 rounded-full mb-3 shadow-xs"
                style={{ backgroundColor: categoryColor }}
              />
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1 break-words">
                {topic.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {topic.subcategory} · <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{topic.category}</span>
              </p>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-2 self-stretch sm:self-auto">
              {/* Quick Toggle Done */}
              <button
                type="button"
                onClick={() => onToggleCompleted(topic.id)}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-white text-emerald-700' : 'border border-white/80'
                }`}>
                  {isCompleted && <HiCheck className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>{isCompleted ? 'Mastered' : 'Mark as Read'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close Modal"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Meta Controls & Status Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${diffConfig.color}`}>
                {diffConfig.label}
              </span>

              {/* Status Select Menu */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-1">
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Status:</span>
                <select
                  value={topic.status}
                  onChange={(e) => onStatusChange(topic.id, e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="not-started" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">⚪ Not Started</option>
                  <option value="in-progress" className="bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-300">🟡 In Progress (Reading)</option>
                  <option value="completed" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-300">🟢 Completed (Mastered)</option>
                  <option value="revision" className="bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-300">🔵 Needs Revision</option>
                </select>
              </div>

              {topic.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200/60 dark:border-slate-700/50"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
              Saved automatically
            </span>
          </div>
        </div>

        {/* Modal Markdown Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: '0.85rem',
                        padding: '1.25rem',
                        fontSize: '0.825rem',
                        lineHeight: '1.65',
                        margin: '1.25rem 0',
                        background: '#090d16',
                        border: '1px solid rgba(148, 163, 184, 0.15)',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {topic.content}
            </ReactMarkdown>
          </div>

          {/* Practical Interview Tip Callout */}
          {topic.interviewTip && (
            <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 rounded-r-2xl border-y border-r border-amber-200/60 dark:border-amber-900/40">
              <div className="flex items-start gap-3">
                <HiLightBulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                    Staff / Senior Interview Tip
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {topic.interviewTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* External References Links */}
          {topic.references?.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Curated Engineering References
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topic.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 transition-all shadow-xs"
                  >
                    <HiExternalLink className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    <span className="truncate">{ref.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Last updated metadata */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
            Last verified: {topic.lastUpdated} · JSON-backed topic #{topic.id}
          </div>
        </div>

        {/* Modal Navigation Footer */}
        <div className="flex-shrink-0 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800/80 px-6 py-3.5 bg-slate-50/70 dark:bg-slate-900/70">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              hasPrev
                ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-800'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            <HiChevronLeft className="w-4 h-4" />
            Previous Concept
          </button>

          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">→</kbd> to navigate · <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">ESC</kbd> to exit
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              hasNext
                ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-800'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            Next Concept
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
