'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { StravaActivity } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props { activities: StravaActivity[]; }

export default function PaceTrendChart({ activities }: Props) {
  const data = activities
    .filter(a => a.distance > 3000)
    .slice(0, 60)
    .reverse()
    .map(a => ({
      date: format(new Date(a.start_date_local), 'dd/MM/yy', { locale: es }),
      pace: Math.round(1000 / a.average_speed),
      name: a.name,
    }));

  const avgPace = data.length > 0
    ? Math.round(data.reduce((sum, d) => sum + d.pace, 0) / data.length)
    : 0;

  const formatPaceAxis = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white font-semibold">Tendencia del ritmo</h3>
        <span className="text-zinc-500 text-xs">
          Promedio: <span className="text-orange-400">{formatPaceAxis(avgPace)}</span> min/km
        </span>
      </div>
      <p className="text-zinc-500 text-xs mb-6">Evolucion de ritmo medio por carrera</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis reversed tickFormatter={formatPaceAxis} tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 12, color: '#fff' }}
            formatter={(v: number) => [formatPaceAxis(v), 'Ritmo']}
          />
          <ReferenceLine y={avgPace} stroke="#27272a" strokeDasharray="4 4" />
          <Line dataKey="pace" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#f97316' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
