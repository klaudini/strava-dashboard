import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getActivities, getAthleteStats } from '@/lib/strava';
import StatsCard from '@/components/dashboard/StatsCard';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import PaceChart from '@/components/dashboard/PaceChart';
import { formatDistance, formatTime } from '@/lib/utils';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const [activities, stats] = await Promise.all([
    getActivities(session.accessToken, 1, 50),
    getAthleteStats(session.accessToken, session.athleteId),
  ]);

  const runs = activities.filter(a => a.sport_type === 'Run');
  const ytd = stats.ytd_run_totals;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Tu resumen de entrenamientos</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          label="Km este año"
          value={formatDistance(ytd.distance)}
          sub={`${ytd.count} carreras`}
          color="orange"
        />
        <StatsCard
          label="Tiempo este año"
          value={formatTime(ytd.moving_time)}
          sub="tiempo en movimiento"
          color="blue"
        />
        <StatsCard
          label="Desnivel este año"
          value={`${Math.round(ytd.elevation_gain).toLocaleString()}m`}
          sub="elevacion acumulada"
          color="green"
        />
        <StatsCard
          label="Actividades totales"
          value={stats.all_run_totals.count.toString()}
          sub={formatDistance(stats.all_run_totals.distance) + ' totales'}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <WeeklyChart activities={runs} />
        <PaceChart activities={runs} />
      </div>

      <RecentActivities activities={runs.slice(0, 8)} />
    </div>
  );
}
