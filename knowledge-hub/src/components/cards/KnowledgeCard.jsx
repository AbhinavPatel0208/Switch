import { HiCheck } from 'react-icons/hi';
import { DIFFICULTY_CONFIG, STATUS_CONFIG, getCategoryColor } from '../../utils/helpers';

export default function KnowledgeCard({ topic, onClick, onToggleCompleted }) {
  const diffConfig = DIFFICULTY_CONFIG[topic.difficulty] || DIFFICULTY_CONFIG.medium;
  const statusConfig = STATUS_CONFIG[topic.status] || STATUS_CONFIG['not-started'];
  const categoryColor = getCategoryColor(topic.category);
  const isCompleted = topic.status === 'completed';

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleCompleted(topic.id);
  };

  return (
    <article
      onClick={() => onClick(topic)}
      className={`card-hover group relative rounded-2xl p-5 sm:p-6 cursor-pointer border transition-all duration-200 ${
        isCompleted
          ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-300/60 dark:border-emerald-500/30 shadow-sm'
          : 'bg-white/90 dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5'
      }`}
    >
      {/* Category Accent Bar with subtle glow */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="h-1.5 w-12 rounded-full transition-all group-hover:w-16"
          style={{ backgroundColor: categoryColor }}
        />
        
        {/* Quick Read Checkbox Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          title={isCompleted ? 'Completed! Click to mark as unread' : 'Mark as Completed'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
          }`}
        >
          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-white text-emerald-700' : 'border border-slate-400 dark:border-slate-500'
          }`}>
            {isCompleted && <HiCheck className="w-2.5 h-2.5 stroke-[3]" />}
          </div>
          <span>{isCompleted ? 'Done' : 'Mark read'}</span>
        </button>
      </div>

      {/* Title */}
      <h3 className={`text-base font-bold mb-2 transition-colors ${
        isCompleted 
          ? 'text-slate-700 dark:text-slate-300 line-through/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400' 
          : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
      }`}>
        {topic.title}
      </h3>

      {/* Subcategory */}
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">
        {topic.subcategory}
      </p>

      {/* Summary */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {topic.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {topic.tags?.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200/60 dark:border-slate-700/50"
          >
            #{tag}
          </span>
        ))}
        {topic.tags?.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 rounded-md">
            +{topic.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer: Difficulty + Category Badge + Interview Tip icon */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${diffConfig.color}`}>
          {diffConfig.label}
        </span>

        <div className="flex items-center gap-2">
          {topic.interviewTip && (
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 text-[11px]"
              title="Includes Practical Interview Tip"
            >
              💡
            </span>
          )}
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {topic.category}
          </span>
        </div>
      </div>
    </article>
  );
}
