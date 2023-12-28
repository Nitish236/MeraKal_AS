import { AppDataSource } from "../database/db";
import { Task } from "../entity/task";

class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);

    return this.taskRepository.save(task);
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: number, status: string): Promise<void> {
    await this.taskRepository.update(id, { status });
  }

  async findTasks(): Promise<any[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async findTasksByStatus(status: string): Promise<any[]> {
    const tasks = await this.taskRepository.find({ where: { status } });
    return tasks;
  }
}

export default new TaskService();
