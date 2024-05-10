// api/spotify/playlists/[playlistId]/route.ts
import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();

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

export async function PUT(request: Request) {
  try {
    const session = await auth();

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

    if (!playlistId) {
      throw new Error("Playlist ID is missing in the request URL.");
    }

    const body = await request.json();
    const { uris, range_start, insert_before } = body;

    // Add tracks to the playlist if 'uris' are provided
    if (uris && Array.isArray(uris)) {
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris }),
        }
      );

      if (!addTracksResponse.ok) {
        const error = await addTracksResponse.json();
        console.error("Spotify API error:", error);
        throw new Error(`Failed to add tracks: ${error.message}`);
      }
    }

    // Reorder tracks in the playlist if 'range_start' and 'insert_before' are provided
    if (range_start !== undefined && insert_before !== undefined) {
      const reorderTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ range_start, insert_before }),
        }
      );

      if (!reorderTracksResponse.ok) {
        const error = await reorderTracksResponse.json();
        console.error("Spotify API error:", error);
        throw new Error(`Failed to reorder tracks: ${error.message}`);
      }
    }

    return new Response(
      JSON.stringify({ message: "Tracks updated successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error in PUT /api/spotify/playlists/[playlistId]:",
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
    console.log("PUT /api/spotify/playlists/[playlistId] - End");
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();

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

    if (!playlistId) {
      throw new Error("Playlist ID is missing in the request URL.");
    }

    const body = await request.json();
    const { uris } = body;

    if (!uris || !Array.isArray(uris)) {
      throw new Error("URIs are missing or not an array.");
    }

    // Corrected format for removing tracks
    const tracksToRemove = uris.map((uri: string) => ({ uri }));

    // Remove tracks from the playlist
    const removeTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tracks: tracksToRemove }),
      }
    );

    if (!removeTracksResponse.ok) {
      const error = await removeTracksResponse.json();
      console.error("Spotify API error:", error);
      throw new Error(`Failed to remove tracks: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ message: "Tracks removed successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error in DELETE /api/spotify/playlists/[playlistId]:",
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
    console.log("DELETE /api/spotify/playlists/[playlistId] - End");
  }
}
