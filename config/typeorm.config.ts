import dotenv from "dotenv";
dotenv.config();

import { Task } from "./../entity/task";
import { DataSourceOptions } from "typeorm";

const databaseConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true, // Set to false in production to avoid auto-schema synchronization
  logging: false, // Enable logging to see database queries
};

if (process.env.NODE_ENV === "production") {
  Object.assign(databaseConfig, { ssl: true, synchronize: false });
}

export default databaseConfig;
