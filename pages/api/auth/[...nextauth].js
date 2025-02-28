// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../lib/mongodb';

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);