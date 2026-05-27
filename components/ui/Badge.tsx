interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'orange' | 'blue' | 'green' | 'red';
}

const variantMap = {
  default: 'bg-zinc-800 text-zinc-300',
  orange: 'bg-orange-500/10 text-orange-400',
  blue: 'bg-blue-500/10 text-blue-400',
  green: 'bg-green-500/10 text-green-400',
  red: 'bg-red-500/10 text-red-400',
};

export default function Badge({ children, variant = 'default' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantMap[variant]}`}>
      {children}
    </span>
  );
}
