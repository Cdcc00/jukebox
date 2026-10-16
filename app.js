import express from "express";
const app = express();

import playlistRouter from "#api/playlists";
import trackRouter from "#api/tracks";

app.use(express.json());

app.use("/tracks", trackRouter);

app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;
