import { Sequelize } from "sequelize";
import "dotenv/config";

const dialect = process.env.DB_DIALECT || "sqlite";

export const sequelize =
  dialect === "mysql"
    ? new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: "mysql",
          logging: false,
        }
      )
    : new Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_STORAGE || "./data/dev.sqlite",
        logging: false,
      });
