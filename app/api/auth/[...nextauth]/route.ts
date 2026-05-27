import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'strava',
      name: 'Strava',
      type: 'oauth',
      clientId: process.env.STRAVA_CLIENT_ID!,
      clientSecret: process.env.STRAVA_CLIENT_SECRET!,
      authorization: {
        url: 'https://www.strava.com/oauth/authorize',
        params: {
          scope: 'read,activity:read_all',
          response_type: 'code',
          approval_prompt: 'auto',
        },
      },
      token: 'https://www.strava.com/oauth/token',
      userinfo: 'https://www.strava.com/api/v3/athlete',
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: `${profile.firstname} ${profile.lastname}`,
          email: profile.email,
          image: profile.profile,
          athleteId: profile.id,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.athleteId = (profile as any)?.id;
      }
      // Refresh token if expired
      if (Date.now() < (token.expiresAt as number) * 1000) {
        return token;
      }
      const { refreshAccessToken } = await import('@/lib/strava');
      const refreshed = await refreshAccessToken(token.refreshToken as string);
      return {
        ...token,
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        expiresAt: refreshed.expires_at,
      };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.athleteId = token.athleteId as number;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
