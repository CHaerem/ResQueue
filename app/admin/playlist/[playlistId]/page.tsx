"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
}

interface PlaylistDetails {
  id: string;
  name: string;
  tracks: { items: Track[] }; // Adjusted to match the typical Spotify API response structure
}

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`/api/spotify/playlists/${playlistId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch playlist");
      }
      const data = await response.json();
      setPlaylist(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]);

  const addTrack = async (trackUri: string) => {
    try {
      const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });

      if (!response.ok) {
        throw new Error("Failed to add track");
      }

      // Refresh playlist details
      fetchPlaylist();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const reorderTrack = async (range_start: number, insert_before: number) => {
    try {
      const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ range_start, insert_before, range_length: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to reorder track");
      }

      // Refresh playlist details
      fetchPlaylist();
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading playlist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div>
      <h1>{playlist.name}</h1>
      <ul>
        {playlist.tracks?.items?.map((track, index) => (
          <li key={track.id}>
            {track.name}
            <button onClick={() => reorderTrack(index, index + 1)}>
              Move Down
            </button>
            <button onClick={() => reorderTrack(index, index - 1)}>
              Move Up
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" placeholder="Track URI" id="trackUri" />
        <button
          onClick={() => {
            const trackUri = (
              document.getElementById("trackUri") as HTMLInputElement
            ).value;
            addTrack(trackUri);
          }}
        >
          Add Track
        </button>
      </div>
    </div>
  );
};

export default PlaylistDetails;
