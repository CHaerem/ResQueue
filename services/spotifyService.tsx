import fetch from "node-fetch";
import { getSession } from "next-auth/react";

class SpotifyService {
  /**
   * Performs an authenticated fetch request to the Spotify API.
   * @param url - The endpoint URL.
   * @param req - The HTTP request object from Next.js API routes.
   * @param method - HTTP method type.
   */
  private static async fetchFromSpotify(url: string, req: any, method = "GET") {
    const session = (await getSession({ req })) as { accessToken?: string };
    if (!session?.accessToken) {
      throw new Error("Spotify access token is missing in the session.");
    }

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Spotify API: ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Fetches the user's playlists from Spotify.
   * @param req - The Next.js request object to retrieve the session from.
   */
  public static async fetchUserPlaylists(
    req: any
  ): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const url = "https://api.spotify.com/v1/me/playlists?limit=50";
    try {
      const data = (await this.fetchFromSpotify(url, req)) as {
        items: SpotifyApi.PlaylistObjectSimplified[];
      };
      return data.items; // Access the 'items' property correctly
    } catch (error) {
      console.error("Error fetching user playlists:", error);
      throw error;
    }
  }

  /**
   * Starts playback on the user's active device.
   * @param req - The Next.js request object to retrieve the session from.
   */
  /**
   * Starts playback on the user's active device.
   * @param req - The Next.js request object to retrieve the session from.
   */
  public static async playMusic(req: any): Promise<void> {
    const url: string = "https://api.spotify.com/v1/me/player/play";
    try {
      await this.fetchFromSpotify(url, req, "PUT");
      console.log("Playback started");
    } catch (error: any) {
      console.error("Could not start playback:", error);
      throw error;
    }
  }

  /**
   * Pauses playback on the user's active device.
   * @param req - The Next.js request object to retrieve the session from.
   */
  /**
   * Pauses playback on the user's active device.
   * @param req - The Next.js request object to retrieve the session from.
   */
  public static async pauseMusic(req: any): Promise<void> {
    const url: string = "https://api.spotify.com/v1/me/player/pause";
    try {
      await this.fetchFromSpotify(url, req, "PUT");
      console.log("Playback paused");
    } catch (error: any) {
      console.error("Could not pause playback:", error);
      throw error;
    }
  }

  /**
   * Fetches the current user's Spotify profile.
   * @param req - The Next.js request object to retrieve the session from.
   */
  public static async fetchSpotifyUserProfile(
    req: any
  ): Promise<SpotifyApi.UserProfileResponse> {
    const url: string = "https://api.spotify.com/v1/me";
    try {
      const data = (await this.fetchFromSpotify(
        url,
        req
      )) as SpotifyApi.UserProfileResponse;
      return data;
    } catch (error: any) {
      console.error("Error fetching Spotify user profile:", error);
      throw error;
    }
  }
}

export default SpotifyService;
