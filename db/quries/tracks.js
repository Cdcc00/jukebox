import db from "#db/client";

export async function createTrack(name, durationMs) {
  const sql = `
INSERT INTO tracks (name,duration_ms)
VALUES ($1,$2)
RETURNING *
`;
  const {
    rows: [track],
  } = await db.query(sql, [name, durationMs]);
  return track;
}

// GET /tracks sends array of all tracks
export async function getTracks() {
  const sql = `
SELECT * FROM tracks
`;

  const { rows: tracks } = await db.query(sql);
  return tracks;
}

// GET /tracks/:id sends track specified by id
export async function getTrack(id) {
  const sql = `
SELECT * FROM tracks WHERE id = $1
`;

  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}
