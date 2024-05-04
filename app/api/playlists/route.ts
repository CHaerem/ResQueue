// app/api/playlists/route.ts
import { NextRequest, NextResponse } from "next/server";
import SpotifyService from "../../../services/spotifyService";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    console.log("User must be authenticated");
    return new NextResponse(
      JSON.stringify({ error: "User must be authenticated" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    console.log("Fetching user playlists...");
    const playlists = await SpotifyService.fetchUserPlaylists(
      token.accessToken
    );
    console.log("Playlists fetched successfully:", playlists);
    return new NextResponse(JSON.stringify(playlists), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch playlists" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
