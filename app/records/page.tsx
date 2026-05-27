import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getActivities } from '@/lib/strava';
import { formatTime, formatPace } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const DISTANCES = [
  { label: '1K', meters: 1000, range: [900, 1100] },
  { label: '5K', meters: 5000, range: [4500, 5500] },
  { label: '10K', meters: 10000, range: [9000, 10500] },
  { label: 'Media Maraton', meters: 21097, range: [20000, 22000] },
  { label: 'Maraton', meters: 42195, range: [40000, 44000] },
];

export default async function RecordsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const activities = await getActivities(session.accessToken, 1, 200);
  const runs = activities.filter(a => a.sport_type === 'Run');

  const records = DISTANCES.map(dist => {
    const matching = runs.filter(a => a.distance >= dist.range[0] && a.distance <= dist.range[1]);
    const best = matching.sort((a, b) => a.moving_time - b.moving_time)[0];
    return { ...dist, best };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Records Personales</h1>
        <p className="text-zinc-500 text-sm mt-1">Tus mejores tiempos en cada distancia</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {records.map(record => (
          <div key={record.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400 text-sm font-medium">{record.label}</span>
              {record.best && (
                <span className="text-yellow-400 text-lg">★</span>
              )}
            </div>
            {record.best ? (
              <>
                <p className="text-3xl font-bold text-white">{formatTime(record.best.moving_time)}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-zinc-500 text-xs">
                    Ritmo: <span className="text-orange-400">{formatPace(record.best.average_speed)} /km</span>
                  </p>
                  <p className="text-zinc-500 text-xs">
                    {format(new Date(record.best.start_date_local), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                  <p className="text-zinc-600 text-xs truncate">{record.best.name}</p>
                </div>
              </>
            ) : (
              <div className="py-4">
                <p className="text-zinc-600 text-sm">Sin datos aun</p>
                <p className="text-zinc-700 text-xs mt-1">Completa una carrera en esta distancia</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
