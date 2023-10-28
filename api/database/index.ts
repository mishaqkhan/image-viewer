import { sequelize } from "./connection";
import ImageModel from "../models/image";

const imageModel = ImageModel(sequelize);

export { sequelize, imageModel };
