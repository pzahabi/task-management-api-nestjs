import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Task from './task.entity';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import User from 'src/auth/user.entity';
import { TaskPriority, TaskStatus } from 'src/constants/enums';

@Injectable()
export default class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, priority, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if(status) {
      query.andWhere('task.status = :status', { status });
    }
    
    if(priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    if(search) {
      query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOneBy({id});
    if (!task || task.user.id !== user.id) throw new NotFoundException('Task with the given ID was not found!');
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, priority, duedate } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.HOLD,
      priority,
      duedate,
      user
    });

    await this.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    await this.remove(task);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.save(task);
    return task;
  }
  
  async updateTaskPriority(id: string, priority: TaskPriority, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.priority = priority;
    await this.save(task);
    return task;
  }
}
