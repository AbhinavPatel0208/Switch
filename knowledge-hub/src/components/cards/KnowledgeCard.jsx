import { HiCheck } from 'react-icons/hi';
import { DIFFICULTY_CONFIG, STATUS_CONFIG, getCategoryColor } from '../../utils/helpers';

export default function KnowledgeCard({ topic, onClick, onToggleCompleted }) {
  const diffConfig   = DIFFICULTY_CONFIG[topic.difficulty] || DIFFICULTY_CONFIG.medium;
  const statusConfig = STATUS_CONFIG[topic.status]         || STATUS_CONFIG['not-started'];
  const categoryColor = getCategoryColor(topic.category);
  const isCompleted  = topic.status === 'completed';

  const handleToggle = (e) => { e.stopPropagation(); onToggleCompleted(topic.id); };

  return (
    <article
      onClick={() => onClick(topic)}
      className={`hack-card card-hover group relative cursor-pointer border transition-all duration-200 ${
        isCompleted
          ? 'bg-emerald-50/40 dark:bg-[#001200]/60 border-emerald-300/60 dark:border-[#00ff41]/30 shadow-sm'
          : 'bg-white/90 dark:bg-[#0d150d] border-slate-200/90 dark:border-[#1a3a1a] hover:border-indigo-400 dark:hover:border-[#00ff41]/30 shadow-sm'
      }
      rounded-2xl dark:rounded-none p-5 sm:p-6`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        {/* Light: accent bar / Dark: topic ID */}
        <div
          className="dark:hidden h-1.5 w-12 rounded-full transition-all group-hover:w-16"
          style={{ backgroundColor: categoryColor }}
        />
        <span className="hidden dark:inline text-[10px] text-[#2d5a2d] tracking-widest truncate max-w-[120px]">
          {topic.id}
        </span>

        {/* Toggle button */}
        <button
          type="button"
          onClick={handleToggle}
          title={isCompleted ? 'Mark as unread' : 'Mark as completed'}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold transition-all
            rounded-xl dark:rounded-none border ${
            isCompleted
              ? 'bg-emerald-600 dark:bg-[#001a00] text-white dark:text-[#00ff41] shadow-sm border-transparent dark:border-[#00ff41]/30'
              : 'bg-slate-100 dark:bg-[#0a120a] text-slate-600 dark:text-[#2d5a2d] border-slate-200 dark:border-[#1a3a1a] hover:text-indigo-600 dark:hover:text-[#00ff41] dark:hover:border-[#00ff41]/20'
          }`}
        >
          <div className={`w-3.5 h-3.5 rounded-full dark:rounded-none flex items-center justify-center ${
            isCompleted ? 'bg-white dark:bg-[#00ff41] text-emerald-700 dark:text-black' : 'border border-slate-400 dark:border-[#2d5a2d]'
          }`}>
            {isCompleted && <HiCheck className="w-2.5 h-2.5 stroke-[3]" />}
          </div>
          <span className="hidden dark:inline">{isCompleted ? 'DONE' : 'MARK'}</span>
          <span className="dark:hidden">{isCompleted ? 'Done' : 'Mark read'}</span>
        </button>
      </div>

      {/* Title */}
      <h3 className={`text-base font-bold mb-2 transition-colors leading-snug ${
        isCompleted
          ? 'text-slate-700 dark:text-[#00ff41]/60 group-hover:text-emerald-600 dark:group-hover:text-[#00ff41]'
          : 'text-slate-900 dark:text-[#00ff41] group-hover:text-indigo-600 dark:group-hover:text-[#66ffaa]'
      }`}>
        {/* Light: plain title / Dark: with prompt prefix */}
        <span className="dark:hidden">{topic.title}</span>
        <span className="hidden dark:inline">
          <span className="text-[#3a7a3a] mr-1.5 select-none">&gt;</span>
          {topic.title}
        </span>
      </h3>

      {/* Subcategory */}
      <p className="text-xs font-medium text-slate-400 dark:text-[#2d5a2d] mb-3 tracking-wide">
        <span className="dark:hidden">{topic.subcategory}</span>
        <span className="hidden dark:inline">// {topic.subcategory}</span>
      </p>

      {/* Summary */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#3a7a3a] leading-relaxed mb-4 line-clamp-2">
        {topic.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {topic.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="px-2.5 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-[#0a120a] text-slate-600 dark:text-[#2d5a2d] rounded-md dark:rounded-none border border-slate-200/60 dark:border-[#1a3a1a] tracking-wide">
            <span className="dark:hidden">#{tag}</span>
            <span className="hidden dark:inline">[{tag}]</span>
          </span>
        ))}
        {topic.tags?.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-[#0a120a] text-slate-500 dark:text-[#1a3a1a] rounded-md dark:rounded-none">
            +{topic.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1a3a1a]/60 text-xs">
        <span className={`px-2.5 py-1 text-[10px] font-bold border rounded-lg dark:rounded-none ${diffConfig.color}`}>
          <span className="dark:hidden">{diffConfig.label}</span>
          <span className="hidden dark:inline">{diffConfig.hackLabel || diffConfig.label}</span>
        </span>

        <div className="flex items-center gap-2">
          {topic.interviewTip && (
            <span className="dark:hidden flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 text-[11px]" title="Includes Interview Tip">💡</span>
          )}
          {topic.interviewTip && (
            <span className="hidden dark:inline text-[10px] text-[#ffb800]/70 border border-[#ffb800]/20 px-1.5 py-0.5">TIP</span>
          )}
          <span className="text-[11px] font-semibold text-slate-500 dark:text-[#2d5a2d] truncate max-w-[80px]">
            {topic.category}
          </span>
        </div>
      </div>
    </article>
  );
}
