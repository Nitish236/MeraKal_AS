import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import TaskService from "../services/TaskService";

import { handleTaskExecution } from "../utils/taskHandler";

import { BadRequestError, NotFoundError } from "../errors/allErr";

/* ----------------------------------------------------------------------------------------------- */

//                     Function to Create Task

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { endpoint, delay, method } = req.query as {
    endpoint?: string;
    delay?: string;
    method?: string;
  };

  const data = req.body;

  const allowedMethods = new Set(["GET", "POST", "PUT", "DELETE"]);

  // Validating required parameters
  if (!endpoint) {
    throw new BadRequestError("Missing endpoint parameter");
  }

  if (!method || !allowedMethods.has(method.toUpperCase())) {
    throw new BadRequestError("Missing or invalid method parameter");
  }

  // Check for data only if request is POST OR PUT
  if (
    new Set(["POST", "PUT"]).has(method.toUpperCase()) &&
    Object.keys(data).length === 0
  ) {
    throw new BadRequestError("Missing data parameter");
  }

  // Parse delay
  const parsedDelay = parseInt(delay || "0", 10);

  if (isNaN(parsedDelay)) {
    throw new BadRequestError("Invalid delay parameter");
  }

  // Create the Task
  const task = await TaskService.createTask({
    endpoint,
    data: JSON.stringify(data),
    delay: parsedDelay,
    method: method.toUpperCase(),
    status: "queued",
  });

  // Queue the task based on delay
  if (task.delay === 0) {
    await handleTaskExecution(task);
  } else {
    setTimeout(async () => {
      try {
        await handleTaskExecution(task);
      } catch (error) {
        console.error(`Error executing the delayed task : ${task.id}`);
      }
    }, task.delay);
  }

  // Return the response
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Task created successfully", task });
};

//                     Function to Get Tasks

export const getTasksByToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Get the Tasks
  const tasks = await TaskService.findTasks();

  if (tasks.length === 0) {
    throw new NotFoundError("No tasks found");
  }

  // Send the response
  res
    .status(StatusCodes.OK)
    .json({ message: "Tasks fetched successfully", tasks });
};

//                     Functiont to Get Tasks by Status

export const getTasksByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Retrieve status
  const { status } = req.params;

  // Validating status field
  if (status !== "complete" && status !== "queued") {
    throw new BadRequestError("Invalid status");
  }

  // Get the Tasks
  const tasks = await TaskService.findTasksByStatus(status);

  if (tasks.length === 0) {
    throw new NotFoundError("No tasks found");
  }

  // Send the response
  res
    .status(StatusCodes.OK)
    .json({ message: "Tasks fetched successfully", tasks });
};
