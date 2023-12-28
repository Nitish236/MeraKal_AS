import "reflect-metadata";
import { DataSource } from "typeorm";
import databaseConfig from "../config/typeorm.config";

// Initialize the Connection
export const AppDataSource = new DataSource(databaseConfig);

// Connect to DB
export default async function connectToDB(): Promise<void> {
  await AppDataSource.initialize();
}
