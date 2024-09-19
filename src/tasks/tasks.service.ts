import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import TaskRepository from './tasks.repository';
import Task from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<Task> {
    return this.tasksRepository.deleteTask(id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status);
  }
}
