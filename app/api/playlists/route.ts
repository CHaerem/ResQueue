// app/api/playlists/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handling GET request for playlists");

  try {
    const session = await auth(req, res);
    if (!session) {
      res.status(401).json({ error: "User must be authenticated" });
      return;
    }

    const playlists = [
      { id: 1, name: "Playlist 1" },
      { id: 2, name: "Playlist 2" },
      { id: 3, name: "Playlist 3" },
    ];
    res.status(200).json(playlists);
  } catch (error: any) {
    // Assuming TypeScript setting where 'error' type handling is required
    console.error("Error in GET /api/playlists:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
