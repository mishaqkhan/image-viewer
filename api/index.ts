import express from "express";
import cors from "cors";

const app = express();
const http = require("http");
const server = http.createServer(app);

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

app.use(cors(corsOptions));

app.get("/test-endpoint", (req, res) => {
  console.log("Request recieved for /test-endpoint");
  res.status(200).send("Recieved");
});

server.listen(process.env.API_PORT, () => {
  console.log(`Listening on port ${process.env.API_PORT}.`);
});
