// app/api/spotify/player/route.ts
import { auth } from "@/auth";

interface SpotifyApiError {
  status: number;
  message: string;
}

interface PlaybackState {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
  };
}

// Function to handle GET request for current playback state
export async function GET(request: Request) {
  console.log("Handling GET request for current playback state");

  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      console.error("No session or access token available");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401 }
      );
    }

    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Fetching the response as text to better handle non-JSON responses
      console.error(`Failed response from Spotify API: ${errorText}`);
      return new Response(errorText || `Error fetching playback data`, {
        status: response.status,
      });
    }

    const responseBody = await response.text();
    if (!responseBody) {
      console.error("Empty response body received from Spotify API");
      return new Response(null, { status: 204 }); // No body should be sent with 204 status
    }

    const playbackState: PlaybackState = JSON.parse(responseBody);
    return new Response(JSON.stringify(playbackState), { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/player:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// Function to handle POST request to control playback (play, pause, next, previous)
export async function POST(request: Request) {
  console.log("Handling POST request to control playback");

  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      console.error("No session or access token available");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401 }
      );
    }

    const { action } = await request.json();
    let endpoint = `https://api.spotify.com/v1/me/player/${action}`;
    let method = ["next", "previous"].includes(action) ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error when trying to control playback: ${errorText}`);
      return new Response(errorText || `Error controlling playback`, {
        status: response.status,
      });
    }

    return new Response(null, { status: 204 }); // Correctly handling 204 responses
  } catch (error: any) {
    console.error("Error in POST /api/player/control:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
