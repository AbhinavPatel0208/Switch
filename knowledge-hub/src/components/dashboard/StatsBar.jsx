import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineBookOpen, HiOutlineChartPie } from 'react-icons/hi';
import { getStats } from '../../utils/helpers';

export default function StatsBar({ allTopics }) {
  const stats = getStats(allTopics);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
      <StatCard
        label="Total Topics"
        value={stats.total}
        icon={HiOutlineBookOpen}
        color="text-indigo-600 dark:text-indigo-400"
        bg="bg-indigo-50/70 dark:bg-indigo-950/20"
        border="border-indigo-100 dark:border-indigo-900/40"
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        icon={HiOutlineCheckCircle}
        color="text-emerald-600 dark:text-emerald-400"
        bg="bg-emerald-50/70 dark:bg-emerald-950/20"
        border="border-emerald-100 dark:border-emerald-900/40"
      />
      <StatCard
        label="In Progress"
        value={stats.inProgress}
        icon={HiOutlineClock}
        color="text-amber-600 dark:text-amber-400"
        bg="bg-amber-50/70 dark:bg-amber-950/20"
        border="border-amber-100 dark:border-amber-900/40"
      />
      <StatCard
        label="Mastery Rate"
        value={`${stats.percentage}%`}
        icon={HiOutlineChartPie}
        color="text-purple-600 dark:text-purple-400"
        bg="bg-purple-50/70 dark:bg-purple-950/20"
        border="border-purple-100 dark:border-purple-900/40"
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, bg, border }) {
  return (
    <div className={`${bg} ${border} border rounded-2xl p-4 sm:p-5 shadow-xs transition-transform hover:-translate-y-0.5 duration-150`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        {Icon && <Icon className={`w-4 h-4 ${color} opacity-80`} />}
      </div>
      <p className={`text-2xl sm:text-3xl font-extrabold ${color} font-mono tracking-tight`}>
        {value}
      </p>
    </div>
  );
}
