import type { Sequelize } from "sequelize";

module.exports = (
  sequelize: Sequelize,
  Sequelize: { BIGINT: any; STRING: any }
) => {
  return sequelize.define("images", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
};
