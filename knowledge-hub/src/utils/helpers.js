export const CATEGORIES = [
  { key: 'all',                   label: 'All Topics',        icon: 'HiViewGrid',   color: '#6366f1' },
  { key: 'Frontend Engineering',  label: 'Frontend & React',  icon: 'FaReact',      color: '#06b6d4' },
  { key: 'System Design',         label: 'System Design',     icon: 'HiServer',     color: '#6366f1' },
  { key: 'Java & Spring Boot',    label: 'Java & Spring',     icon: 'FaJava',       color: '#f59e0b' },
  { key: 'Data Engineering',      label: 'Data Engineering',  icon: 'HiChartBar',   color: '#10b981' },
  { key: 'Microservices',         label: 'Microservices',     icon: 'HiCube',       color: '#8b5cf6' },
  { key: 'DSA & Algorithms',      label: 'DSA & Algorithms',  icon: 'HiCode',       color: '#ef4444' },
  { key: 'Databases & ORM',       label: 'Databases & ORM',   icon: 'HiDatabase',   color: '#0ea5e9' },
  { key: 'DevOps & Cloud',        label: 'DevOps & Cloud',    icon: 'HiCloud',      color: '#f97316' },
  { key: 'Interview Questions',   label: 'Interview Q&A',     icon: 'HiAcademicCap',color: '#ec4899' },
];

export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    hackLabel: '[EASY]',
    color: 'bg-emerald-500/10 dark:bg-[#001200] text-emerald-700 dark:text-[#00ff41] border-emerald-200 dark:border-[#00ff41]/25',
  },
  medium: {
    label: 'Medium',
    hackLabel: '[MED]',
    color: 'bg-amber-500/10 dark:bg-[#120e00] text-amber-700 dark:text-[#ffb800] border-amber-200 dark:border-[#ffb800]/25',
  },
  hard: {
    label: 'Hard',
    hackLabel: '[HARD]',
    color: 'bg-rose-500/10 dark:bg-[#130000] text-rose-700 dark:text-[#ff4444] border-rose-200 dark:border-[#ff4444]/25',
  },
  expert: {
    label: 'Expert',
    hackLabel: '[XPERT]',
    color: 'bg-purple-500/10 dark:bg-[#0d0015] text-purple-700 dark:text-[#cc44ff] border-purple-200 dark:border-[#cc44ff]/25',
  },
};

export const STATUS_CONFIG = {
  'not-started': {
    label: 'Not Started',
    hackLabel: 'PENDING',
    color: 'bg-slate-100 dark:bg-[#0a120a] text-slate-600 dark:text-[#3a7a3a]',
    dot: 'bg-slate-400 dark:bg-[#2d5a2d]',
  },
  'in-progress': {
    label: 'In Progress',
    hackLabel: 'RUNNING',
    color: 'bg-amber-100 dark:bg-[#120e00] text-amber-700 dark:text-[#ffb800]',
    dot: 'bg-amber-500 dark:bg-[#ffb800]',
  },
  'completed': {
    label: 'Completed',
    hackLabel: 'DONE',
    color: 'bg-emerald-100 dark:bg-[#001200] text-emerald-700 dark:text-[#00ff41]',
    dot: 'bg-emerald-500 dark:bg-[#00ff41]',
  },
  'revision': {
    label: 'Needs Revision',
    hackLabel: 'REVIEW',
    color: 'bg-blue-100 dark:bg-[#00070d] text-blue-700 dark:text-[#00d4ff]',
    dot: 'bg-blue-500 dark:bg-[#00d4ff]',
  },
};

export function getCategoryColor(category) {
  const cat = CATEGORIES.find(c => c.key === category);
  return cat ? cat.color : '#6366f1';
}

export function getAllTags(topics) {
  const tagSet = new Set();
  topics.forEach(topic => { topic.tags?.forEach(tag => tagSet.add(tag)); });
  return Array.from(tagSet).sort();
}

export function getStats(topics) {
  const total      = topics.length;
  const completed  = topics.filter(t => t.status === 'completed').length;
  const inProgress = topics.filter(t => t.status === 'in-progress').length;
  const notStarted = topics.filter(t => t.status === 'not-started').length;
  const revision   = topics.filter(t => t.status === 'revision').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, inProgress, notStarted, revision, percentage };
}

export function getCategoryStats(topics) {
  const categoryMap = {};
  topics.forEach(topic => {
    if (!categoryMap[topic.category]) categoryMap[topic.category] = { total: 0, completed: 0 };
    categoryMap[topic.category].total++;
    if (topic.status === 'completed') categoryMap[topic.category].completed++;
  });
  return categoryMap;
}
