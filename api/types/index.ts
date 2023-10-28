import type { Dialect } from "sequelize";

export type DBConfig = {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  port: number;
  dialect: Dialect;
  pool: {
    acquire: number;
    idle: number;
    max: number;
    min: number;
  };
};
