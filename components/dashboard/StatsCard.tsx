const colorMap = {
  orange: 'text-orange-400 bg-orange-500/10',
  blue: 'text-blue-400 bg-blue-500/10',
  green: 'text-green-400 bg-green-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
};

interface Props {
  label: string;
  value: string;
  sub: string;
  color: keyof typeof colorMap;
}

export default function StatsCard({ label, value, sub, color }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${colorMap[color].split(' ')[0]}`}>{value}</p>
      <p className="text-zinc-600 text-xs mt-1">{sub}</p>
    </div>
  );
}
