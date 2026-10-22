// Category configuration with icons and colors
export const CATEGORIES = [
  { key: 'all', label: 'All Topics', icon: 'HiViewGrid', color: '#6366f1' },
  { key: 'Frontend Engineering', label: 'Frontend & React', icon: 'FaReact', color: '#06b6d4' },
  { key: 'System Design', label: 'System Design', icon: 'HiServer', color: '#6366f1' },
  { key: 'Java & Spring Boot', label: 'Java & Spring', icon: 'FaJava', color: '#f59e0b' },
  { key: 'Data Engineering', label: 'Data Engineering', icon: 'HiChartBar', color: '#10b981' },
  { key: 'Microservices', label: 'Microservices', icon: 'HiCube', color: '#8b5cf6' },
  { key: 'DSA & Algorithms', label: 'DSA & Algorithms', icon: 'HiCode', color: '#ef4444' },
  { key: 'Databases & ORM', label: 'Databases & ORM', icon: 'HiDatabase', color: '#0ea5e9' },
  { key: 'DevOps & Cloud', label: 'DevOps & Cloud', icon: 'HiCloud', color: '#f97316' },
  { key: 'Interview Questions', label: 'Interview Q&A', icon: 'HiAcademicCap', color: '#ec4899' },
];

export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    color: 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
  },
  medium: {
    label: 'Medium',
    color: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
  },
  hard: {
    label: 'Hard',
    color: 'bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
  },
  expert: {
    label: 'Expert',
    color: 'bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
  },
};

export const STATUS_CONFIG = {
  'not-started': {
    label: 'Not Started',
    color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    dot: 'bg-slate-400 dark:bg-slate-500',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  'completed': {
    label: 'Completed',
    color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  'revision': {
    label: 'Needs Revision',
    color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
};

export function getCategoryColor(category) {
  const cat = CATEGORIES.find(c => c.key === category);
  return cat ? cat.color : '#6366f1';
}

export function getAllTags(topics) {
  const tagSet = new Set();
  topics.forEach(topic => {
    topic.tags?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getStats(topics) {
  const total = topics.length;
  const completed = topics.filter(t => t.status === 'completed').length;
  const inProgress = topics.filter(t => t.status === 'in-progress').length;
  const notStarted = topics.filter(t => t.status === 'not-started').length;
  const revision = topics.filter(t => t.status === 'revision').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, inProgress, notStarted, revision, percentage };
}

export function getCategoryStats(topics) {
  const categoryMap = {};
  topics.forEach(topic => {
    if (!categoryMap[topic.category]) {
      categoryMap[topic.category] = { total: 0, completed: 0 };
    }
    categoryMap[topic.category].total++;
    if (topic.status === 'completed') {
      categoryMap[topic.category].completed++;
    }
  });
  return categoryMap;
}
