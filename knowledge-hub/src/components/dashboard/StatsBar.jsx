import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineBookOpen, HiOutlineChartPie } from 'react-icons/hi';
import { getStats } from '../../utils/helpers';

export default function StatsBar({ allTopics }) {
  const stats = getStats(allTopics);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard
        label="Total Topics"
        hackLabel="MODULES"
        value={stats.total}
        hackValue={String(stats.total).padStart(4, '0')}
        icon={HiOutlineBookOpen}
        lightColor="text-indigo-600"
        lightBg="bg-indigo-50/70 border-indigo-100"
        hackColor="text-[#00d4ff]"
        hackBorder="border-[#00d4ff]/20"
        hackUnit="topics"
      />
      <StatCard
        label="Completed"
        hackLabel="DONE"
        value={stats.completed}
        hackValue={String(stats.completed).padStart(4, '0')}
        icon={HiOutlineCheckCircle}
        lightColor="text-emerald-600"
        lightBg="bg-emerald-50/70 border-emerald-100"
        hackColor="text-[#00ff41]"
        hackBorder="border-[#00ff41]/20"
        hackUnit="done"
      />
      <StatCard
        label="In Progress"
        hackLabel="RUNNING"
        value={stats.inProgress}
        hackValue={String(stats.inProgress).padStart(4, '0')}
        icon={HiOutlineClock}
        lightColor="text-amber-600"
        lightBg="bg-amber-50/70 border-amber-100"
        hackColor="text-[#ffb800]"
        hackBorder="border-[#ffb800]/20"
        hackUnit="active"
      />
      <StatCard
        label="Mastery Rate"
        hackLabel="COVERAGE"
        value={`${stats.percentage}%`}
        hackValue={`${stats.percentage}`}
        icon={HiOutlineChartPie}
        lightColor="text-purple-600"
        lightBg="bg-purple-50/70 border-purple-100"
        hackColor="text-[#cc44ff]"
        hackBorder="border-[#cc44ff]/20"
        hackUnit="%"
      />
    </div>
  );
}

function StatCard({ label, hackLabel, value, hackValue, icon: Icon, lightColor, lightBg, hackColor, hackBorder, hackUnit }) {
  return (
    <div className={`border rounded-2xl dark:rounded-none p-4 sm:p-5 shadow-xs transition-transform hover:-translate-y-0.5 dark:hover:translate-y-0 duration-150 ${lightBg} dark:bg-[#0d150d] dark:border-[#1a3a1a] dark:hover:${hackBorder}`}>
      {/* Light mode */}
      <div className="dark:hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
          {Icon && <Icon className={`w-4 h-4 ${lightColor} opacity-80`} />}
        </div>
        <p className={`text-2xl sm:text-3xl font-extrabold ${lightColor} font-mono tracking-tight`}>{value}</p>
      </div>

      {/* Dark / hacker mode */}
      <div className="hidden dark:block">
        <p className={`text-[10px] tracking-widest mb-1 ${hackColor} opacity-50`}>// {hackLabel}</p>
        <p className={`text-2xl sm:text-3xl font-bold font-mono ${hackColor} tracking-wider`} style={{ textShadow: `0 0 10px currentColor` }}>
          {hackValue}
          <span className={`text-sm ml-1 opacity-50`}>{hackUnit}</span>
        </p>
      </div>
    </div>
  );
}
