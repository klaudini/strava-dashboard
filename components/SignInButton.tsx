'use client';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('strava', { callbackUrl: '/dashboard' })}
      className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-lg"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116z"/>
        <path d="M11.374 14.103l2.083-4.116 2.084 4.116h3.066L13.457 3.931 8.308 14.103h3.066z"/>
      </svg>
      Conectar con Strava
    </button>
  );
}
