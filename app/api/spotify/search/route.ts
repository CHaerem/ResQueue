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
    const query = url.searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({
          error: "Bad Request",
          message: "Query parameter is required",
        }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to search tracks: ${error.message}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/spotify/search:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
