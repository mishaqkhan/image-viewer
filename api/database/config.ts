import type { DBConfig } from "../types";

export const config: DBConfig = {
  HOST: process.env.DB_HOST || "",
  USER: process.env.MYSQL_USER || "",
  PASSWORD: process.env.MYSQL_ROOT_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "",
  port: Number(process.env.MYSQLDB_DOCKER_PORT),
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
