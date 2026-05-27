'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '◼' },
  { href: '/activities', label: 'Actividades', icon: '▶' },
  { href: '/progress', label: 'Progreso', icon: '↗' },
  { href: '/records', label: 'Récords', icon: '★' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116z"/>
              <path d="M11.374 14.103l2.083-4.116 2.084 4.116h3.066L13.457 3.931 8.308 14.103h3.066z"/>
            </svg>
          </div>
          <span className="text-white font-bold text-lg">StravaBoard</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-orange-500/10 text-orange-400'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {session?.user && (
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-zinc-500 text-xs">Atleta</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full text-zinc-500 hover:text-white text-xs py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Cerrar sesion
          </button>
        </div>
      )}
    </aside>
  );
}
