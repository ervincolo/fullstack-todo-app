import { Injectable } from '@nestjs/common';
import {randomUUID} from 'crypto';

interface Task {
  id: string,
  title: string
};

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

   findAll(): Task[] {
    return this.tasks;
  }

  create(title: string): Task {
    const newTask: Task = {id: randomUUID(), title};
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, title: string): Task | {message: string} {
    const task = this.tasks.find((t) => t.id === id);
    if(!task) return {message: 'Task not found'};

    task.title = title;
    return task;
  }

  remove(id: string): {message: string} {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return {message: 'Task deleted'};
  }
}
