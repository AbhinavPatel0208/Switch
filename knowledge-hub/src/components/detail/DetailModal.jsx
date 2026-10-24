import { useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  HiX, HiExternalLink, HiLightBulb, HiChevronLeft, HiChevronRight, HiCheck,
} from 'react-icons/hi';
import { DIFFICULTY_CONFIG, STATUS_CONFIG, getCategoryColor } from '../../utils/helpers';

const hackSyntaxStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#060f06',
    border: '1px solid rgba(0,255,65,0.12)',
    borderRadius: '2px',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    color: '#b4ffb4',
  },
};

export default function DetailModal({
  topic, onClose, onPrev, onNext, hasPrev, hasNext, onStatusChange, onToggleCompleted,
}) {
  const diffConfig   = DIFFICULTY_CONFIG[topic.difficulty] || DIFFICULTY_CONFIG.medium;
  const statusConfig = STATUS_CONFIG[topic.status]         || STATUS_CONFIG['not-started'];
  const categoryColor = getCategoryColor(topic.category);
  const isCompleted  = topic.status === 'completed';

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft'  && hasPrev) onPrev();
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
        className="absolute inset-0 bg-slate-950/70 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[calc(100vh-3rem)] bg-white dark:bg-[#080e08] rounded-3xl dark:rounded-none border border-slate-200 dark:border-[#1a3a1a] dark:shadow-[0_0_0_1px_rgba(0,255,65,0.05),0_0_60px_rgba(0,255,65,0.04)] shadow-2xl overflow-hidden flex flex-col transition-colors duration-200">

        {/* Hacker terminal title bar */}
        <div className="hidden dark:flex items-center gap-2 px-4 py-1.5 bg-[#0d150d] border-b border-[#1a3a1a]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff4444]/40 border border-[#ff4444]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffb800]/40 border border-[#ffb800]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/40 border border-[#00ff41]/20" />
          <span className="flex-1 text-center text-[10px] text-[#2d5a2d] tracking-widest truncate">
            {topic.category.toLowerCase().replace(/ /g,'-')}/{topic.subcategory.toLowerCase().replace(/ /g,'-')}/{topic.id}.md
          </span>
          <button type="button" onClick={onClose} className="text-[#2d5a2d] hover:text-[#ff4444] transition-colors">
            <HiX className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Header */}
        <div className="flex-shrink-0 border-b border-slate-200/80 dark:border-[#1a3a1a] p-4 sm:p-7 bg-slate-50/50 dark:bg-[#0a120a]">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              {/* Light: accent bar / Dark: path breadcrumb */}
              <div className="dark:hidden w-12 h-1.5 rounded-full mb-3 shadow-xs" style={{ backgroundColor: categoryColor }} />
              <p className="hidden dark:block text-[10px] text-[#2d5a2d] tracking-widest mb-2">
                &gt; cat <span className="text-[#3a7a3a]">{topic.id}.md</span>
              </p>

              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#00ff41] tracking-tight mb-1 break-words" style={{ textShadow: 'none' }}>
                <span className="dark:hidden">{topic.title}</span>
                <span className="hidden dark:inline" style={{ textShadow: '0 0 10px rgba(0,255,65,0.3)' }}>{topic.title}</span>
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-[#3a7a3a]">
                {topic.subcategory}
                <span className="mx-1 dark:text-[#1a3a1a]">·</span>
                <span className="text-indigo-600 dark:text-[#00d4ff] font-semibold">{topic.category}</span>
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 self-stretch sm:self-auto">
              {/* Done toggle */}
              <button
                type="button"
                onClick={() => onToggleCompleted(topic.id)}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-bold transition-all rounded-xl dark:rounded-none border ${
                  isCompleted
                    ? 'bg-emerald-600 dark:bg-[#001a00] text-white dark:text-[#00ff41] border-transparent dark:border-[#00ff41]/30 shadow-sm'
                    : 'bg-indigo-600 dark:bg-[#0a120a] hover:bg-indigo-500 dark:hover:bg-[#001200] text-white dark:text-[#3a7a3a] dark:hover:text-[#00ff41] border-transparent dark:border-[#1a3a1a] dark:hover:border-[#00ff41]/30 shadow-sm'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full dark:rounded-none flex items-center justify-center ${
                  isCompleted ? 'bg-white dark:bg-[#00ff41] text-emerald-700 dark:text-black' : 'border border-white/80 dark:border-[#3a7a3a]'
                }`}>
                  {isCompleted && <HiCheck className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className="dark:hidden">{isCompleted ? 'Mastered' : 'Mark as Read'}</span>
                <span className="hidden dark:inline">{isCompleted ? 'DONE' : 'MARK_READ'}</span>
              </button>

              {/* Close (light only — dark has terminal title bar close) */}
              <button
                type="button"
                onClick={onClose}
                className="dark:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Meta controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-[#1a3a1a]">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg dark:rounded-none border ${diffConfig.color}`}>
                <span className="dark:hidden">{diffConfig.label}</span>
                <span className="hidden dark:inline">{diffConfig.hackLabel || diffConfig.label}</span>
              </span>

              {/* Status select */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#0a120a] border border-slate-200 dark:border-[#1a3a1a] rounded-xl dark:rounded-none px-3 py-1">
                <span className={`w-2 h-2 rounded-full dark:rounded-none ${statusConfig.dot}`} />
                <span className="text-[11px] font-semibold text-slate-500 dark:text-[#2d5a2d]">
                  <span className="dark:hidden">Status:</span>
                  <span className="hidden dark:inline">STATE:</span>
                </span>
                <select
                  value={topic.status}
                  onChange={(e) => onStatusChange(topic.id, e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 dark:text-[#b4ffb4] focus:outline-none cursor-pointer"
                >
                  <option value="not-started"  className="bg-white dark:bg-[#0a120a]">⚪ Not Started</option>
                  <option value="in-progress"  className="bg-white dark:bg-[#0a120a]">🟡 In Progress</option>
                  <option value="completed"    className="bg-white dark:bg-[#0a120a]">🟢 Completed</option>
                  <option value="revision"     className="bg-white dark:bg-[#0a120a]">🔵 Needs Revision</option>
                </select>
              </div>

              {topic.tags?.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-[#0a120a] text-slate-600 dark:text-[#2d5a2d] rounded-md dark:rounded-none border border-slate-200/60 dark:border-[#1a3a1a]">
                  <span className="dark:hidden">#{tag}</span>
                  <span className="hidden dark:inline">[{tag}]</span>
                </span>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-400 dark:text-[#1a3a1a] hidden sm:inline">
              <span className="dark:hidden">Saved automatically</span>
              <span className="hidden dark:inline">// auto-save: ON</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 dark:bg-[#080e08]">
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
                        borderRadius: '0.75rem',
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
                    <code className={className} {...props}>{children}</code>
                  );
                },
              }}
            >
              {topic.content}
            </ReactMarkdown>
          </div>

          {/* Interview tip */}
          {topic.interviewTip && (
            <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-[#ffb800]/5 dark:via-transparent dark:to-transparent border-l-4 border-amber-500 dark:border-[#ffb800] rounded-r-2xl dark:rounded-r-none border-y border-r border-amber-200/60 dark:border-[#ffb800]/15">
              <div className="flex items-start gap-3">
                <HiLightBulb className="w-5 h-5 text-amber-500 dark:text-[#ffb800] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-[#ffb800] uppercase tracking-wider mb-1">
                    <span className="dark:hidden">Staff / Senior Interview Tip</span>
                    <span className="hidden dark:inline">// INTERVIEW_TIP</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-[#b4ffb4] leading-relaxed">
                    {topic.interviewTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* References */}
          {topic.references?.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-bold text-slate-400 dark:text-[#2d5a2d] uppercase tracking-wider mb-3">
                <span className="dark:hidden">Curated Engineering References</span>
                <span className="hidden dark:inline">// REFERENCES</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topic.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-[#0a120a] rounded-xl dark:rounded-none text-xs font-semibold text-indigo-600 dark:text-[#00d4ff] hover:text-indigo-700 dark:hover:text-[#66e8ff] hover:bg-slate-100 dark:hover:bg-[#0d1a0d] border border-slate-200 dark:border-[#1a3a1a] dark:hover:border-[#00d4ff]/20 transition-all shadow-xs"
                  >
                    <HiExternalLink className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-[#1a3a1a]" />
                    <span className="truncate">{ref.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Footer meta */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#1a3a1a] text-[11px] font-mono text-slate-400 dark:text-[#1a3a1a]">
            <span className="dark:hidden">Last verified: {topic.lastUpdated} · #{topic.id}</span>
            <span className="hidden dark:inline">// last_updated: {topic.lastUpdated} | id: {topic.id}</span>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="flex-shrink-0 flex items-center justify-between border-t border-slate-200/80 dark:border-[#1a3a1a] px-6 py-3.5 bg-slate-50/70 dark:bg-[#0a120a]">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl dark:rounded-none transition-colors ${
              hasPrev
                ? 'text-slate-700 dark:text-[#3a7a3a] hover:bg-slate-200/80 dark:hover:bg-[#0d150d] dark:hover:text-[#b4ffb4]'
                : 'text-slate-300 dark:text-[#1a3a1a] cursor-not-allowed'
            }`}
          >
            <HiChevronLeft className="w-4 h-4" />
            <span className="dark:hidden">Previous Concept</span>
            <span className="hidden dark:inline">PREV</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400 dark:text-[#1a3a1a] hidden sm:inline">
            <span className="dark:hidden">
              Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">→</kbd> to navigate · <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">ESC</kbd> to exit
            </span>
            <span className="hidden dark:inline">← → navigate | ESC exit</span>
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl dark:rounded-none transition-colors ${
              hasNext
                ? 'text-slate-700 dark:text-[#3a7a3a] hover:bg-slate-200/80 dark:hover:bg-[#0d150d] dark:hover:text-[#b4ffb4]'
                : 'text-slate-300 dark:text-[#1a3a1a] cursor-not-allowed'
            }`}
          >
            <span className="dark:hidden">Next Concept</span>
            <span className="hidden dark:inline">NEXT</span>
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
