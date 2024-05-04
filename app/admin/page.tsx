// app/admin/page.tsx

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Admin() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (session) {
        try {
          const res = await fetch("/api/playlists");
          if (!res.ok) throw new Error("Failed to fetch playlists");
          const data = await res.json();
          setPlaylists(data);
        } catch (error) {
          console.error("Error fetching playlists:", error);
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
      <ul>
        {playlists.map((playlist: { name: string }, index: number) => (
          <li key={index}>{playlist.name}</li>
        ))}
      </ul>
    </>
  );
}
