import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import TaskRepository from './tasks.repository';
import Task from './task.entity';
import User from 'src/auth/user.entity';
import { TaskPriority, TaskStatus } from 'src/constants/enums';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TaskRepository
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
      return await this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.tasksRepository.getTaskById(id, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<Task> {
    return await this.tasksRepository.deleteTask(id, user);
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return await this.tasksRepository.updateTaskStatus(id, status, user);
  }
  
  async updateTaskPriority(id: string, priority: TaskPriority, user: User): Promise<Task> {
    return await this.tasksRepository.updateTaskPriority(id, priority, user);
  }
}
