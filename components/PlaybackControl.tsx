import { useCallback, useEffect, useState } from "react";

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

interface Props {
  accessToken: string;
}

export default function PlaybackControl({ accessToken }: Props) {
  const [playback, setPlayback] = useState<PlaybackState | null>(null);
  const [error, setError] = useState<string>("");

  // Use useCallback to memoize fetchPlaybackState
  const fetchPlaybackState = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch playback state");
      }
      if (res.status === 204) {
        // Handle no content explicitly
        setPlayback(null);
        return;
      }
      const data: PlaybackState = await res.json();
      setPlayback(data);
    } catch (error: any) {
      console.error("Error fetching playback state:", error);
      setError(error.message);
    }
  }, [accessToken]); // Include accessToken as a dependency for useCallback

  useEffect(() => {
    fetchPlaybackState();
  }, [fetchPlaybackState]); // fetchPlaybackState is now a stable function

  const handlePlaybackControl = async (action: string) => {
    try {
      const res = await fetch(`/api/spotify/player/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Failed to ${action} playback`);
      }
      fetchPlaybackState(); // Refresh playback state after action
    } catch (error: any) {
      console.error(`Error during playback control (${action}):`, error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Current Playback</h2>
      {error && <p>Error: {error}</p>}
      {playback ? (
        <div>
          <p>
            Now Playing: {playback.item.name} by{" "}
            {playback.item.artists.map((artist) => artist.name).join(", ")}
          </p>
          <button onClick={() => handlePlaybackControl("previous")}>
            Previous
          </button>
          <button onClick={() => handlePlaybackControl("play")}>Play</button>
          <button onClick={() => handlePlaybackControl("pause")}>Pause</button>
          <button onClick={() => handlePlaybackControl("next")}>Next</button>
        </div>
      ) : (
        <p>No active playback.</p>
      )}
    </div>
  );
}
