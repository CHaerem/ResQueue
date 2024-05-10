// components/Spotify/TrackItem.tsx
"use client";

interface Track {
  id: string;
  name: string;
  album: { name: string; images?: { url: string }[] };
  artists: { name: string }[];
}

interface TrackItemProps {
  track: Track;
  onAddTrack?: (trackId: string) => void;
  onDeleteTrack?: (trackId: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  onAddTrack,
  onDeleteTrack,
  onMoveUp,
  onMoveDown,
}) => {
  const handleAdd = () => {
    if (onAddTrack) onAddTrack(track.id);
  };

  const handleDelete = () => {
    if (onDeleteTrack) onDeleteTrack(track.id);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      {track.album.images && track.album.images.length > 0 && (
        <img
          src={track.album.images[0].url}
          alt={track.album.name}
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
      )}
      <div>
        <div>
          <strong>{track.name}</strong>
        </div>
        <div>{track.artists.map((artist) => artist.name).join(", ")}</div>
        <div>
          <em>{track.album.name}</em>
        </div>
      </div>
      {onAddTrack && (
        <button onClick={handleAdd} style={{ marginLeft: "auto" }}>
          Add to Playlist
        </button>
      )}
      {onDeleteTrack && (
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      )}
      {onMoveUp && (
        <button onClick={onMoveUp} style={{ marginLeft: "10px" }}>
          Move Up
        </button>
      )}
      {onMoveDown && (
        <button onClick={onMoveDown} style={{ marginLeft: "10px" }}>
          Move Down
        </button>
      )}
    </div>
  );
};

export default TrackItem;
