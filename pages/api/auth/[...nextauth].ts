import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
