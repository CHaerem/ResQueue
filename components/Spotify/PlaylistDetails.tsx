// components/PlaylistDetails.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import SearchTracks from "./SearchTracks";
import TrackItem from "./TrackItem";

interface Track {
  id: string;
  name: string;
  album: { name: string; images?: { url: string }[] };
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
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const fetchPlaylist = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/spotify/playlists/${playlistId}?market=US&fields=name,tracks.items(track(id,name,artists(name),album(name,images)))`
      );
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
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId, fetchPlaylist]);

  const addTrack = async (trackId: string) => {
    try {
      const trackUri = `spotify:track:${trackId}`;
      const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
        method: "PUT",
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

  const deleteTrack = async (trackId: string) => {
    try {
      const trackUri = `spotify:track:${trackId}`;
      const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete track");
      }

      // Refresh playlist details
      fetchPlaylist();
    } catch (error: any) {
      console.error("Error deleting track:", error.message);
      setError(error.message);
    }
  };

  const searchTracks = async (query: string) => {
    try {
      const response = await fetch(
        `/api/spotify/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search tracks");
      }
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error: any) {
      setSearchError(error.message);
    }
  };

  if (loading) return <div>Loading playlist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div>
      <h1>{playlist.name}</h1>
      <div>
        {playlist.tracks.items.map(
          (item, index) =>
            item.track && (
              <TrackItem
                key={item.track.id}
                track={item.track}
                onDeleteTrack={deleteTrack}
                onMoveUp={() => reorderTrack(index, index - 1)}
                onMoveDown={() => reorderTrack(index, index + 2)}
              />
            )
        )}
      </div>
      <SearchTracks
        onSearch={searchTracks}
        searchResults={searchResults}
        error={searchError}
        onAddTrack={addTrack}
      />
    </div>
  );
};

export default PlaylistDetails;
