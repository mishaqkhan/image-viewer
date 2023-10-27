import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sampleData from "./sampleData";

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

app.get("/images", (req, res) => {
  res.status(200).json(sampleData);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
