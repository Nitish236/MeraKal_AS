import { Router } from "express";
import {
  createTask,
  getTasksByToken,
  getTasksByStatus,
} from "../controllers/taskController";

// Middleware to authenticate the API
import { authenticateAPI_KEY } from "../middleware/auth-api-key-middleware";
// Middleware to authenticate token
import { authMiddleware } from "./../middleware/auth-middleware";

const taskRoutes = Router();

taskRoutes.post("/", authenticateAPI_KEY, createTask); // Route to Create a Task

taskRoutes.get("/tasks", authMiddleware, getTasksByToken); // Route to create Get Tasks

taskRoutes.get("/tasks/:status", getTasksByStatus); // Route to Get Tasks by Status

export default taskRoutes;
