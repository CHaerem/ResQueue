import NextAuth, { NextAuthOptions, User, Account, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;
      if (email) {
        const admin = await prisma.admin.findUnique({
          where: { email: email },
        });
        if (admin) {
          return true;
        }
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/admin/dashboard";
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
