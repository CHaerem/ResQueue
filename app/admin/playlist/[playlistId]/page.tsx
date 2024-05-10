// app/admin/playlist/[playlistId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import PlaylistDetails from "@/components/Spotify/PlaylistDetails"; // Adjust the import path if necessary

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = Array.isArray(params.playlistId)
    ? params.playlistId[0]
    : params.playlistId;

  if (!playlistId) {
    return <div>Invalid playlist ID</div>;
  }

  return <PlaylistDetails playlistId={playlistId} />;
};

export default PlaylistPage;
