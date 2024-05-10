// compontents/Playlists.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Playlist {
  id: string;
  name: string;
}

interface Track {
  id: string;
  name: string;
}

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [newPlaylistDescription, setNewPlaylistDescription] =
    useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/spotify/playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const openPlaylist = (playlistId: string) => {
    router.push(`/admin/playlist/${playlistId}`);
  };

  const createPlaylist = async () => {
    try {
      const response = await fetch("/api/spotify/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPlaylistName,
          description: newPlaylistDescription,
          public: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const newPlaylist = await response.json();
      setPlaylists((prev) => [...prev, newPlaylist]);
      setNewPlaylistName("");
      setNewPlaylistDescription("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const searchTracks = async () => {
    try {
      const response = await fetch(
        `/api/spotify/search?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search tracks");
      }
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>User Playlists</h1>
      {loading && <div>Loading playlists...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <button onClick={() => openPlaylist(playlist.id)}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Playlist</h2>
        <input
          type="text"
          placeholder="Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Playlist Description"
          value={newPlaylistDescription}
          onChange={(e) => setNewPlaylistDescription(e.target.value)}
        />
        <button onClick={createPlaylist}>Create Playlist</button>
      </div>
      <div>
        <h2>Search Tracks</h2>
        <input
          type="text"
          placeholder="Search for tracks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchTracks}>Search</button>
        <ul>
          {searchResults.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlists;
