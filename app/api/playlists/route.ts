// app/api/playlists/route.ts

import { auth } from "../../../auth";

export async function GET(request: Request) {
  console.log("Handling GET request for playlists");

  try {
    const session = await auth();
    if (!session) {
      return new Response("User must be authenticated", {
        status: 401,
      });
    }

    const playlists = [
      { id: 1, name: "Playlist 1" },
      { id: 2, name: "Playlist 2" },
      { id: 3, name: "Playlist 3" },
    ];
    return new Response(JSON.stringify(playlists), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in GET /api/playlists:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
