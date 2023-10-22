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
        let admin = await prisma.admin.findUnique({ where: { email: email } });
        if (!admin) {
          // If the email corresponds to an admin, create a new admin record
          admin = await prisma.admin.create({
            data: { email: email },  // You can add name: user.name if name is a field on Admin
          });
        }
        return true;  // Allow sign in
      }
      return false;  // Deny sign in if there's no email or not an admin
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/admin/";
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
