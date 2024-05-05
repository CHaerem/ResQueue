// app/auth.ts

import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Spotify({
      authorization: {
        params: {
          scope:
            "playlist-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private",
        },
      },
    }),
  ],
});
