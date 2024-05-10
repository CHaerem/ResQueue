// components/Spotify/SearchTracks.tsx
"use client";

import { useState } from "react";

interface Track {
  id: string;
  name: string;
}

interface SearchTracksProps {
  onSearch: (query: string) => void;
  searchResults: Track[];
  error: string | null;
  onAddTrack: (trackId: string) => void;
}

const SearchTracks: React.FC<SearchTracksProps> = ({
  onSearch,
  searchResults,
  error,
  onAddTrack,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <h2>Search Tracks</h2>
      <input
        type="text"
        placeholder="Search for tracks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div>Error: {error}</div>}
      <ul>
        {searchResults.map((track) => (
          <li key={track.id}>
            {track.name}
            <button onClick={() => onAddTrack(track.id)}>
              Add to Playlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTracks;
