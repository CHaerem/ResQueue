import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "User must be authenticated and have a valid access token",
        }),
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const playlistId = url.pathname.split("/").pop(); // Extract playlistId from the URL

    if (!playlistId) {
      throw new Error("Playlist ID is missing in the request URL.");
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch playlist: ${error.message}`);
    }

    const data = await response.json();
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
  }
}
