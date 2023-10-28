import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as db from "./database/connection";

const PORT = process.env.API_PORT || 3001;

const app = express();
const http = require("http");
const server = http.createServer(app);

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize.sync({ force: true });

app.post("/image", async (req, res) => {
  try {
    await db.imageModel.create(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

app.get("/images", async (req, res) => {
  const allImages = await db.imageModel.findAll();
  res.status(200).json(allImages);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
