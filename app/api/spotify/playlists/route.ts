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

interface CreatePlaylistBody {
  name: string;
  description?: string;
  public?: boolean;
}

// Function to handle GET request
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      // Ensure session and accessToken are available
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "User must be authenticated and have a valid access token",
        }),
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

// Function to handle POST request
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.accessToken) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "User must be authenticated and have a valid access token",
        }),
        {
          status: 401,
        }
      );
    }

    const userIdResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!userIdResponse.ok) {
      const error: SpotifyApiError = await userIdResponse.json();
      throw new Error(`Failed to fetch user ID: ${error.message}`);
    }

    const userData = await userIdResponse.json();
    const userId = userData.id;

    const body: CreatePlaylistBody = await request.json();
    const { name, description = "", public: isPublic = true } = body;

    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
        }),
      }
    );

    if (!createPlaylistResponse.ok) {
      const error: SpotifyApiError = await createPlaylistResponse.json();
      throw new Error(`Failed to create playlist: ${error.message}`);
    }

    const newPlaylist = await createPlaylistResponse.json();
    return new Response(JSON.stringify(newPlaylist), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error in POST /api/playlists:", error.message);
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
