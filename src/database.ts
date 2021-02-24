import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: "localhost",
    dialect: "mysql",
    omitNull: true,
  }
);
