import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { unstable_getServerSession } from 'next-auth/next';
import DiscordProvider from 'next-auth/providers/discord';
import { prisma } from '@/lib/db';
import { env } from '../env/server';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = async () => {
  return await unstable_getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getServerAuthSession();

  return session?.user;
};
