import { StatusCodes } from "http-status-codes";
import TaskService from "../services/taskService";
import { Task } from "../entity/task";
import axios from "axios";

/* ------------------------------------------------------------------------------------------- */

//                 Function to handle the execution later on

export const handleTaskExecution = async (task: Task): Promise<void> => {
  try {
    // Send the request to the URL
    const response = await axios({
      method: task.method,
      url: task.endpoint,
      data: JSON.parse(task.data),
    });

    // Check the response code and update the Task
    if (response.status === StatusCodes.OK) {
      await TaskService.update(task.id, "complete");
    } else {
      await TaskService.update(task.id, "failed");
    }
  } catch (error) {
    await TaskService.update(task.id, "failed");
  }
};
