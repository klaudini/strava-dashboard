'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StravaActivity } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  activities: StravaActivity[];
}

export default function PaceChart({ activities }: Props) {
  const data = activities
    .filter(a => a.distance > 2000)
    .slice(0, 30)
    .reverse()
    .map(a => ({
      date: format(new Date(a.start_date_local), 'dd MMM', { locale: es }),
      pace: Math.round(1000 / a.average_speed),
    }));

  const formatPaceAxis = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-1">Evolucion del ritmo</h3>
      <p className="text-zinc-500 text-xs mb-6">Ultimas 30 carreras (min/km)</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            reversed
            tickFormatter={formatPaceAxis}
            tick={{ fill: '#71717a', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 12, color: '#fff' }}
            formatter={(v: number) => [formatPaceAxis(v), 'Ritmo']}
          />
          <Line dataKey="pace" stroke="#f97316" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
