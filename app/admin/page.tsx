//app/admin/page.tsx
"use client";

import { useSession } from "next-auth/react";
import PlaybackControl from "@/components/PlaybackControl"; // Adjust the import path as necessary
import Playlists from "@/components/Playlists"; // Adjust the import path as necessary

export default function Admin() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to be logged in.</p>;
  }

  return (
    <>
      <h1>Hi {session.user?.name}</h1>
      {session.accessToken && (
        <>
          <PlaybackControl accessToken={session.accessToken} />
          <Playlists />
        </>
      )}
    </>
  );
}
