const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log("Request recieved for /");
  console.log("process.env: ", process.env.API_PORT);
  res.status(200).send("Recieved");
});

server.listen(process.env.API_PORT, () => {
  console.log(`Listening on port 3001.`);
});
