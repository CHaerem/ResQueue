// app/api/auth/[...nextauth]/route.tsx

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logger = {
  error(code: string, metadata: any) {
    console.error(code, metadata);
  },
  warn(message: string) {
    console.warn(message);
  },
  debug(message: string) {
    console.debug(message);
  },
};

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private",
        },
      },
    }),
  ],
  logger,
});

export { handler as GET, handler as POST };
