import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from "#db/quries/playlists";
import {
  createPlaylistsTracks,
  getPlaylistTracks,
} from "#db/quries/playlistsTracks";
import { getTrack } from "#db/quries/tracks";
import { Q } from "#node_modules/@faker-js/faker/dist/core-BMOHu6e5";
import express from "express";
const playlistRouter = express.Router();
export default playlistRouter;

//GET /tracks sends array of all tracks
playlistRouter
  .get("/", async (req, res) => {
    res.send(await getPlaylists());
  })
  .post("/", async (req, res) => {
    if (!req.body) return res.status(400).send("Body is missing");
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).send("Body is missing key element");

    res.status(201).send(await createPlaylist(name, description));
  });

playlistRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).send("ID must be a number");
  const track = await getPlaylist(id);
  if (!track) return res.status(404).send("Playlist not found.");
  res.send(track);
});

playlistRouter.param("id", async (req, res, next, id) => {
  const playlistId = Number(id);
  if (!Number.isInteger(playlistId))
    return res.status(400).send("ID must be a number");

  const playlist = await getPlaylist(id);
  if (!playlist) {
    return res.status(404).send("Playlist is missing");
  }

  req.playlist = playlist;
  next();
});

playlistRouter
  .get("/:id/tracks", async (req, res) => {
    const tracks = await getPlaylistTracks(req.playlist.id);
    res.send(tracks);
  })
  .post("/:id/tracks", async (req, res) => {
    if (!req.body) return res.status(400).send("Body is missing");
    const { trackId } = req.body;
    if (trackId === undefined)
      return res.status(400).send("Track id is missing");

    const id = Number(trackId);
    if (!Number.isInteger(id))
      return res.status(400).send("Track id must be a number");

    const track = await getTrack(id);
    if (!track) return res.status(400).send("No track is found");

    try {
      const playlistTrack = await createPlaylistsTracks(req.playlist.id, id);
      res.status(201).send(playlistTrack);
    } catch (err) {
      return res.status(400).send("Repeated");
    }
  });
