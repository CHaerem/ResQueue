// app/admin/page.tsx

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Playlist {
  id: number;
  name: string;
}

export default function Admin() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (session) {
        try {
          const res = await fetch("/api/playlists");
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to fetch playlists");
          }
          const data = await res.json();
          setPlaylists(data);
        } catch (error: any) {
          console.error("Error fetching playlists:", error);
          setError(error.message);
        }
      }
    };

    fetchPlaylists();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to be logged in.</p>;
  }

  return (
    <>
      <h1>Hi {session.user?.name}</h1>
      <h2>Your Playlists</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </>
  );
}
