import { getTrack, getTracks } from "#db/quries/tracks";
import express from "express";
const trackRouter = express.Router();
export default trackRouter;

//GET /tracks sends array of all tracks
trackRouter.get("/", async (req, res) => {
  res.send(await getTracks());
});

//GET /tracks/:id sends track specified by id
trackRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).send("ID must be a number.");
  const track = await getTrack(id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});
