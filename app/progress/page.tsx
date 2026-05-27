import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getActivities } from '@/lib/strava';
import MonthlyProgressChart from '@/components/progress/MonthlyProgressChart';
import PaceTrendChart from '@/components/progress/PaceTrendChart';

export default async function ProgressPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const activities = await getActivities(session.accessToken, 1, 200);
  const runs = activities.filter(a => a.sport_type === 'Run');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Progreso</h1>
        <p className="text-zinc-500 text-sm mt-1">Tu evolucion a lo largo del tiempo</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <MonthlyProgressChart activities={runs} />
        <PaceTrendChart activities={runs} />
      </div>
    </div>
  );
}
