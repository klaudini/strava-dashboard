import { StravaActivity } from '@/lib/types';
import { formatTime, formatPace } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  label: string;
  best?: StravaActivity;
}

export default function PRCard({ label, best }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-zinc-400 text-sm font-medium">{label}</span>
        {best && <span className="text-yellow-400 text-lg">★</span>}
      </div>
      {best ? (
        <>
          <p className="text-3xl font-bold text-white">{formatTime(best.moving_time)}</p>
          <div className="mt-3 space-y-1">
            <p className="text-zinc-500 text-xs">
              Ritmo: <span className="text-orange-400">{formatPace(best.average_speed)} /km</span>
            </p>
            <p className="text-zinc-500 text-xs">
              {format(new Date(best.start_date_local), "d 'de' MMMM, yyyy", { locale: es })}
            </p>
            <p className="text-zinc-600 text-xs truncate">{best.name}</p>
          </div>
        </>
      ) : (
        <div className="py-4">
          <p className="text-zinc-600 text-sm">Sin datos aun</p>
          <p className="text-zinc-700 text-xs mt-1">Completa una carrera en esta distancia</p>
        </div>
      )}
    </div>
  );
}
