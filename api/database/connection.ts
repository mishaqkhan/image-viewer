import { Sequelize } from "sequelize";
import ImageModel from "../models/image";
import { config } from "./db.config";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

sequelize.authenticate().then(() => {
  console.log("Database connected...");
});

const imageModel = ImageModel(sequelize);

export { Sequelize, sequelize, imageModel };
