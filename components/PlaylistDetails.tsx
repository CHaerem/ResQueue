// components/PlaylistDetails.tsx
"use client";

import { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  album: { name: string };
  artists: { name: string }[];
}

interface PlaylistTrackItem {
  track: Track | null;
}

interface PlaylistDetailsProps {
  playlistId: string;
}

interface PlaylistDetailsData {
  id: string;
  name: string;
  tracks: {
    items: PlaylistTrackItem[];
  };
}

const PlaylistDetails = ({ playlistId }: PlaylistDetailsProps) => {
  const [playlist, setPlaylist] = useState<PlaylistDetailsData | null>(null);
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
      console.error("Error fetching playlist:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]); // Added fetchPlaylist to dependencies

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
      console.error("Error adding track:", error.message);
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
      console.error("Error reordering track:", error.message);
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
        {playlist.tracks.items.map((item, index) => (
          <li key={item.track?.id}>
            {item.track?.name}
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
