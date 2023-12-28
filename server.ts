import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectToDB, { AppDataSource } from "./database/db";

// Middlewares
import errorMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";

// Routes
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes); // Auth Routes

app.use("/", taskRoutes); // Tasks Routes

app.use(errorMiddleware); // Middleware to handle all thrown errors
app.use(notFoundMiddleware); // Middleware to handle Routes that are not there

// Function to start the server
export const startServer = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // connect to DB
      await connectToDB();

      console.log("\nDB connected !!!");

      server.listen(process.env.PORT, () => {
        console.log(`App listening at http://localhost:${process.env.PORT}\n`);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Function to close the server
export const closeServer = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Close DB connection
      if (AppDataSource.isInitialized) await AppDataSource.destroy();

      console.log("\nDB connection closed");

      server.close();

      console.log("Server is closed\n");

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// When running the file directly
if (require.main === module) {
  startServer().catch((error) => {
    console.log(error);
    console.error("\nError starting the server : ", error.message);

    closeServer().catch((error) => {
      console.error("Error closing the server : ", error.message);
    });
  });
}

export default server;
