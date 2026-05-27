'use client';
import { useSession } from 'next-auth/react';

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8">
      {title && <h2 className="text-white font-semibold">{title}</h2>}
      {session?.user && (
        <p className="text-zinc-500 text-sm ml-auto">
          Bienvenido, <span className="text-white">{session.user.name}</span>
        </p>
      )}
    </header>
  );
}
