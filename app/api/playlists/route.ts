import { auth } from "@/auth";

interface SpotifyApiError {
  status: number;
  message: string;
}

interface SpotifyPlaylistItem {
  id: string;
  name: string;
  public: boolean;
  // Add more properties as per the Spotify API
}

interface SpotifyPlaylistsResponse {
  items: SpotifyPlaylistItem[];
}

// Function to handle GET request
export async function GET(request: Request) {
  console.log("Handling GET request for playlists");

  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      // Ensure session and accessToken are available
      return new Response(
        "User must be authenticated and have a valid access token",
        {
          status: 401,
        }
      );
    }

    const spotifyResponse = await fetch(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Use the access token here
          "Content-Type": "application/json",
        },
      }
    );

    if (!spotifyResponse.ok) {
      const error: SpotifyApiError = await spotifyResponse.json();
      throw new Error(`Failed to fetch playlists: ${error.message}`);
    }

    const data: SpotifyPlaylistsResponse = await spotifyResponse.json();
    return new Response(JSON.stringify(data.items), {
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
