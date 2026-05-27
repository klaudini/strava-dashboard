import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getActivities } from '@/lib/strava';
import { formatDistance, formatTime, formatPace } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default async function ActivitiesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const activities = await getActivities(session.accessToken, 1, 100);
  const runs = activities.filter(a => a.sport_type === 'Run');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Actividades</h1>
        <p className="text-zinc-500 text-sm mt-1">{runs.length} carreras registradas</p>
      </div>
      <div className="space-y-3">
        {runs.map(activity => (
          <div key={activity.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold">{activity.name}</p>
                <p className="text-zinc-500 text-sm mt-0.5">
                  {format(new Date(activity.start_date_local), "EEEE d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-orange-400 font-bold">{formatDistance(activity.distance)}</p>
                  <p className="text-zinc-600 text-xs">km</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-bold">{formatPace(activity.average_speed)}</p>
                  <p className="text-zinc-600 text-xs">ritmo</p>
                </div>
                <div className="text-center">
                  <p className="text-zinc-300 font-bold">{formatTime(activity.moving_time)}</p>
                  <p className="text-zinc-600 text-xs">tiempo</p>
                </div>
                <div className="text-center">
                  <p className="text-zinc-400 font-bold">{Math.round(activity.total_elevation_gain)}m</p>
                  <p className="text-zinc-600 text-xs">desnivel</p>
                </div>
                {activity.average_heartrate && (
                  <div className="text-center hidden md:block">
                    <p className="text-red-400 font-bold">{Math.round(activity.average_heartrate)}</p>
                    <p className="text-zinc-600 text-xs">bpm</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
