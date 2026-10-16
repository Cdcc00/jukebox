import db from "#db/client";

export async function createPlaylistsTracks(playlistId, trackId) {
  const sql = `
INSERT INTO playlists_tracks (playlist_id, track_id )
VALUES ($1,$2)
RETURNING *
`;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}

export async function getPlaylistTracks(playlistId) {
  const sql = `
  SELECT tracks.*
  FROM tracks JOIN playlists_tracks ON tracks.id =playlists_tracks.track_id
  WHERE playlists_tracks.playlist_id = $1
  `;

  const { rows: tracks } = await db.query(sql, [playlistId]);
  return tracks;
}

