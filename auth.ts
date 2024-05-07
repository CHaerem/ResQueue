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
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      authorization: {
        params: {
          scope:
            "playlist-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!user) {
        console.error("User is undefined in session callback");
        throw new Error(
          "User must be authenticated and have a valid access token"
        );
      }

      session.user.id = user.id; // Attach user ID to the session object

      const spotifyAccount = await prisma.account.findFirst({
        where: { userId: user.id, provider: "spotify" },
      });

      if (spotifyAccount) {
        if (
          !spotifyAccount.access_token ||
          (spotifyAccount.expires_at &&
            spotifyAccount.expires_at * 1000 < Date.now())
        ) {
          // Refresh the token here if it's expired
          try {
            const response = await fetch(
              "https://accounts.spotify.com/api/token",
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  client_id: process.env.AUTH_SPOTIFY_ID!,
                  client_secret: process.env.AUTH_SPOTIFY_SECRET!,
                  grant_type: "refresh_token",
                  refresh_token: spotifyAccount.refresh_token || "",
                }),
                method: "POST",
              }
            );

            const tokens = await response.json();

            if (!response.ok) {
              console.error(
                `Failed to refresh token: ${JSON.stringify(tokens)}`
              );
              throw new Error("Failed to refresh Spotify access token");
            }

            // Update the account with new tokens
            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: "spotify",
                  providerAccountId: spotifyAccount.providerAccountId,
                },
              },
              data: {
                access_token: tokens.access_token,
                expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                refresh_token:
                  tokens.refresh_token || spotifyAccount.refresh_token,
              },
            });

            session.accessToken = tokens.access_token; // Update session with new access token
          } catch (error) {
            console.error("Error refreshing Spotify access token", error);
            throw new Error("Error during access token refresh");
          }
        } else {
          // If the token isn't expired, just use the existing one
          session.accessToken = spotifyAccount.access_token;
        }
      } else {
        console.error("Spotify account not found for user");
        throw new Error(
          "User must be authenticated and have a valid access token"
        );
      }

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    };
    accessToken?: string;
    error?: string;
  }
}
