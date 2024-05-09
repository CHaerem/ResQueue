"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Playlist {
  id: string;
  name: string;
}

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) return <div>Loading playlists...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <button onClick={() => openPlaylist(playlist.id)}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
