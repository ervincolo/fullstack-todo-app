import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

 @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body() body: {title: string}) {
    return this.tasksService.create(body.title);
  }


  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body:{title: string}) {
    return this.tasksService.update(id, body.title);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  
}
