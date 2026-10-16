import db from "#db/client";
import {createPlaylist} from "./quries/playlists.js";
import createPlaylistsTracks from "./quries/playlistsTracks.js";
import {createTrack} from "./quries/tracks.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracks = [];
  const playlists = [];
  for (let i = 0; i < 20; i++) {
    const name = faker.music.songName();
    const durationMs = faker.number.int({ min: 60000, max: 300000 });
    const track = await createTrack(name, durationMs);
    tracks.push(track);
  }

  for (let i = 0; i < 10; i++) {
    const name = faker.lorem.words(3);
    const description = faker.lorem.sentence();
    const playlist = await createPlaylist(name, description);
    playlists.push(playlist);
  }

  for (let i = 0; i < 15; i++) {
    const playlist = playlists[i % 10];
    const track = tracks[i];
    await createPlaylistsTracks(playlist.id, track.id);
  }
}
