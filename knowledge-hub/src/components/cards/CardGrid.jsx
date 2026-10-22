import KnowledgeCard from './KnowledgeCard';
import EmptyState from '../common/EmptyState';
import { CATEGORIES, getCategoryColor } from '../../utils/helpers';
import {
  HiServer,
  HiChartBar,
  HiCube,
  HiCode,
  HiDatabase,
  HiCloud,
  HiAcademicCap,
  HiViewGrid,
  HiChevronRight,
} from 'react-icons/hi';
import { FaJava, FaReact } from 'react-icons/fa';

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

// Subcategory icon & visual emoji badges
const subcategoryBadges = {
  'React': { badge: '⚛️ React Core', color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-600 dark:text-cyan-400 border-cyan-400/30' },
  'Angular': { badge: '🅰️ Angular 16+', color: 'from-red-500/20 to-red-500/5 text-red-600 dark:text-red-400 border-red-400/30' },
  'JavaScript & TypeScript': { badge: '📜 JS & TypeScript', color: 'from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-400/30' },
  'Performance & Architecture': { badge: '🚀 Web Vitals & Perf', color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-400/30' },
  'PostgreSQL': { badge: '🐘 PostgreSQL Engine', color: 'from-sky-500/20 to-sky-500/5 text-sky-600 dark:text-sky-400 border-sky-400/30' },
  'MySQL': { badge: '🐬 MySQL InnoDB', color: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-400/30' },
  'SQL & Query Optimization': { badge: '🔍 SQL & EXPLAIN Plans', color: 'from-indigo-500/20 to-indigo-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-400/30' },
  'JPA & Hibernate': { badge: '🧬 JPA / Hibernate ORM', color: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-400/30' },
  'Apache Kafka': { badge: '📨 Apache Kafka', color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-400/30' },
  'Apache Flink': { badge: '🌊 Apache Flink (L3)', color: 'from-teal-500/20 to-teal-500/5 text-teal-600 dark:text-teal-400 border-teal-400/30' },
  'Redis & Caching': { badge: '⚡ Redis Architecture', color: 'from-rose-500/20 to-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-400/30' },
  'Java Core & Concurrency': { badge: '☕ Java Concurrency', color: 'from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-400/30' },
  'Spring Boot Internals': { badge: '🍃 Spring Boot IoC', color: 'from-green-500/20 to-green-500/5 text-green-600 dark:text-green-400 border-green-400/30' },
  'Distributed Systems Fundamentals': { badge: '🌐 Distributed Systems', color: 'from-indigo-500/20 to-indigo-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-400/30' },
  'Architecture Patterns': { badge: '🏛️ Architecture Patterns', color: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-400/30' },
  'Scalability & Infrastructure': { badge: '📈 Scalability & Proxies', color: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-400/30' },
  'Resilience & Fault Tolerance': { badge: '🛡️ Resilience & Circuit Breaker', color: 'from-violet-500/20 to-violet-500/5 text-violet-600 dark:text-violet-400 border-violet-400/30' },
  'Distributed Patterns': { badge: '🔄 Distributed Sagas', color: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-400/30' },
  'Searching & Two Pointers': { badge: '🎯 Searching & Pointers', color: 'from-rose-500/20 to-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-400/30' },
  'Trees & Graphs': { badge: '🌲 Graphs & Topological Sort', color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-400/30' },
  'Dynamic Programming': { badge: '🧩 Dynamic Programming', color: 'from-red-500/20 to-red-500/5 text-red-600 dark:text-red-400 border-red-400/30' },
  'Docker & Containers': { badge: '🐳 Docker & Layering', color: 'from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-400 border-orange-400/30' },
  'Kubernetes Orchestration': { badge: '☸️ Kubernetes K8s', color: 'from-sky-500/20 to-sky-500/5 text-sky-600 dark:text-sky-400 border-sky-400/30' },
  'System Design Case Studies': { badge: '💡 HLD TinyURL & Bitly', color: 'from-pink-500/20 to-pink-500/5 text-pink-600 dark:text-pink-400 border-pink-400/30' },
  'Core OOP & Design Principles': { badge: '📐 SOLID & OOP Design', color: 'from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-400/30' },
};

export default function CardGrid({
  topics,
  hierarchicalTopics,
  onCardClick,
  onToggleCompleted,
  viewMode = 'grouped',
}) {
  if (topics.length === 0) {
    return <EmptyState />;
  }

  // Flat view: Standard 3-column card grid
  if (viewMode === 'flat') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {topics.map(topic => (
          <KnowledgeCard
            key={topic.id}
            topic={topic}
            onClick={onCardClick}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </div>
    );
  }

  // Grouped Hierarchical View (Category -> Subcategories / Pillars -> Cards)
  return (
    <div className="space-y-12">
      {hierarchicalTopics.map(catGroup => {
        const catConfig = CATEGORIES.find(c => c.key === catGroup.category);
        const IconComponent = catConfig ? iconMap[catConfig.icon] : HiViewGrid;
        const catColor = getCategoryColor(catGroup.category);
        const completedCount = catGroup.subcategories.reduce(
          (acc, sub) => acc + sub.topics.filter(t => t.status === 'completed').length,
          0
        );

        return (
          <section key={catGroup.category} className="space-y-6">
            {/* Category Banner / Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: `${catColor}15`, color: catColor }}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    {catGroup.category}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {catGroup.subcategories.length} subcategories · {catGroup.totalTopics} concepts
                  </p>
                </div>
              </div>

              {/* Category Completion Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <span className={`w-2 h-2 rounded-full ${completedCount === catGroup.totalTopics ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                <span>{completedCount} / {catGroup.totalTopics} Mastered</span>
              </div>
            </div>

            {/* Subcategories (e.g. REACT, ANGULAR, POSTGRESQL, MYSQL) */}
            <div className="space-y-8 pl-1 sm:pl-2">
              {catGroup.subcategories.map(subGroup => {
                const badgeInfo = subcategoryBadges[subGroup.name] || {
                  badge: subGroup.name,
                  color: 'from-slate-500/10 to-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
                };

                return (
                  <div key={subGroup.name} className="space-y-3.5">
                    {/* Subcategory Pillar Header */}
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className={`flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r border ${badgeInfo.color}`}>
                        <span className="truncate">{badgeInfo.badge}</span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" />
                      <span className="text-xs font-mono text-slate-400">
                        {subGroup.topics.length} {subGroup.topics.length === 1 ? 'topic' : 'topics'}
                      </span>
                    </div>

                    {/* Cards Grid for this Subcategory */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {subGroup.topics.map(topic => (
                        <KnowledgeCard
                          key={topic.id}
                          topic={topic}
                          onClick={onCardClick}
                          onToggleCompleted={onToggleCompleted}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
