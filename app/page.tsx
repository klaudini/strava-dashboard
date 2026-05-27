import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import SignInButton from '@/components/SignInButton';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116z"/>
              <path d="M11.374 14.103l2.083-4.116 2.084 4.116h3.066L13.457 3.931 8.308 14.103h3.066z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white">StravaBoard</h1>
        </div>
        <p className="text-zinc-400 text-lg max-w-md">
          Visualiza tus entrenamientos, analiza tu progreso y celebra tus récords personales.
        </p>
        <SignInButton />
      </div>
    </main>
  );
}
