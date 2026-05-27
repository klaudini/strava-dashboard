'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StravaActivity } from '@/lib/types';
import { startOfMonth, format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props { activities: StravaActivity[]; }

export default function MonthlyProgressChart({ activities }: Props) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthStart = startOfMonth(subMonths(new Date(), i));
    return {
      month: format(monthStart, 'MMM yy', { locale: es }),
      monthStart,
      km: 0,
      count: 0,
    };
  }).reverse();

  activities.forEach(a => {
    const actDate = new Date(a.start_date_local);
    const monthIdx = months.findIndex((m, i) => {
      const next = i < months.length - 1 ? months[i + 1].monthStart : new Date();
      return actDate >= m.monthStart && actDate < next;
    });
    if (monthIdx !== -1) {
      months[monthIdx].km += a.distance / 1000;
      months[monthIdx].count += 1;
    }
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-1">Volumen mensual</h3>
      <p className="text-zinc-500 text-xs mb-6">Kilometros por mes — ultimos 12 meses</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={months} barSize={28}>
          <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 12, color: '#fff' }}
            formatter={(v: number) => [`${v.toFixed(1)} km`]}
          />
          <Bar dataKey="km" fill="#f97316" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
