// api/spotify/playlists/[playlistId]/route.ts
import { auth } from "@/auth";

export async function GET(request: Request) {
  console.log("GET /api/spotify/playlists/[playlistId] - Start");

  try {
    const session = await auth();
    console.log("Session retrieved:", session);

    if (!session || !session.accessToken) {
      console.log("Unauthorized access attempt");
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "User must be authenticated and have a valid access token",
        }),
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const playlistId = url.pathname.split("/").pop();
    console.log("Extracted playlist ID:", playlistId);

    if (!playlistId) {
      throw new Error("Playlist ID is missing in the request URL.");
    }

    // Fetch playlist details and tracks
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?market=US&fields=name,tracks(items(track(id,name,artists(name),album(name))))`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Spotify API response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Spotify API error:", error);
      throw new Error(`Failed to fetch playlist: ${error.message}`);
    }

    const data = await response.json();
    console.log("Fetched playlist data:", JSON.stringify(data, null, 2));

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error(
      "Error in GET /api/spotify/playlists/[playlistId]:",
      error.message
    );
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      { status: 500 }
    );
  } finally {
    console.log("GET /api/spotify/playlists/[playlistId] - End");
  }
}
