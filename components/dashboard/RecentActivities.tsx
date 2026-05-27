import { StravaActivity } from '@/lib/types';
import { formatDistance, formatTime, formatPace } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  activities: StravaActivity[];
}

export default function RecentActivities({ activities }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-1">Actividades recientes</h3>
      <p className="text-zinc-500 text-xs mb-6">Ultimas 8 carreras</p>
      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{activity.name}</p>
              <p className="text-zinc-500 text-xs mt-0.5">
                {format(new Date(activity.start_date_local), "d 'de' MMMM", { locale: es })}
              </p>
            </div>
            <div className="flex items-center gap-6 ml-4">
              <div className="text-right">
                <p className="text-orange-400 text-sm font-semibold">{formatDistance(activity.distance)}</p>
                <p className="text-zinc-500 text-xs">distancia</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-blue-400 text-sm font-semibold">{formatPace(activity.average_speed)}</p>
                <p className="text-zinc-500 text-xs">ritmo</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-zinc-300 text-sm font-semibold">{formatTime(activity.moving_time)}</p>
                <p className="text-zinc-500 text-xs">tiempo</p>
              </div>
              {activity.average_heartrate && (
                <div className="text-right hidden lg:block">
                  <p className="text-red-400 text-sm font-semibold">{Math.round(activity.average_heartrate)}</p>
                  <p className="text-zinc-500 text-xs">bpm</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
