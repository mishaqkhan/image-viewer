import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import * as db from "./database";

const PORT = process.env.API_PORT || 3001;

const app = express();
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
  try {
    const allImages = await db.imageModel.findAll({
      where: { isDeleted: false },
      attributes: ["id", "url", "name", "author", "description"],
    });

    res.status(200).json({ success: true, data: allImages });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

app.get("/images/:id", async (req, res) => {
  try {
    const image = await db.imageModel.findOne({
      where: { id: req.params.id, isDeleted: false },
      attributes: ["id", "url", "name", "author", "description"],
    });

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

app.delete("/images/:id", async (req, res) => {
  try {
    await db.imageModel.update(
      { isDeleted: true },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

app.patch("/images/:id", async (req, res) => {
  try {
    const { url, name, author, description } = req.body;
    const updateSet = { url, name, author, description };

    await db.imageModel.update(updateSet, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
