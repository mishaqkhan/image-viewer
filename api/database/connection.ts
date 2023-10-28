import { config } from "./db.config";
import { Sequelize } from "sequelize";

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

const imageModel = require("../models/image")(sequelize, Sequelize);

export { Sequelize, sequelize, imageModel };
