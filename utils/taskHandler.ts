import { StatusCodes } from "http-status-codes";
import TaskService from "../services/TaskService";
import { Task } from "../entity/task";
import axios from "axios";

export const handleTaskExecution = async (task: Task): Promise<void> => {
  try {
    const response = await axios({
      method: task.method,
      url: task.endpoint,
      data: JSON.parse(task.data),
    });

    if (response.status === StatusCodes.OK) {
      await TaskService.update(task.id, "complete");
    } else {
      await TaskService.update(task.id, "failed");
    }
  } catch (error) {
    await TaskService.update(task.id, "failed");
  }
};
