import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const connection = async () => {
  const name = process.env.DATABASE_NAME || "";
  const user = process.env.DATABASE_USER || "";
  const password = process.env.DATABASE_PASSWORD || "";

  const sequelize = new Sequelize(name, user, password, {
    host: "localhost",
    dialect: "mysql",
  });

  return sequelize;
};
