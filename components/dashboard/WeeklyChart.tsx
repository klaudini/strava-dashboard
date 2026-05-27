'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StravaActivity } from '@/lib/types';
import { startOfWeek, format, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  activities: StravaActivity[];
}

export default function WeeklyChart({ activities }: Props) {
  const weeks = Array.from({ length: 12 }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 1 });
    return {
      week: format(weekStart, 'dd MMM', { locale: es }),
      km: 0,
      count: 0,
      weekStart,
    };
  }).reverse();

  activities.forEach(activity => {
    const actDate = new Date(activity.start_date_local);
    const weekIdx = weeks.findIndex((w, i) => {
      const nextWeekStart = i < weeks.length - 1 ? weeks[i + 1].weekStart : new Date();
      return actDate >= w.weekStart && actDate < nextWeekStart;
    });
    if (weekIdx !== -1) {
      weeks[weekIdx].km += activity.distance / 1000;
      weeks[weekIdx].count += 1;
    }
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-1">Kilometros semanales</h3>
      <p className="text-zinc-500 text-xs mb-6">Ultimas 12 semanas</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeks} barSize={20}>
          <XAxis dataKey="week" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
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
