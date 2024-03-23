import type { NextAuthConfig } from 'next-auth';
import { getUser } from '@/app/lib/data';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = ['/home', '/lists'].some(path => nextUrl.pathname.startsWith(path));
      if (isOnLoginPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
