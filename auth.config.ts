import type { NextAuthConfig } from 'next-auth';
import { getUser } from '@/app/lib/data';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogedPage = ['/home', '/lists'].some(path => nextUrl.pathname.startsWith(path));
      const isOnPublicPage = ['/public'].some(path => nextUrl.pathname.startsWith(path));
      if (isOnLogedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnPublicPage) {
        return true
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
