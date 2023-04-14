import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  myTask: Task = {
    label: '',
    completed: false
  }
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();

  }
  getTasks() {
    this.taskService.getAll().subscribe(data_api => this.tasks = data_api)
  }
  deleteTask(id: number | undefined) {
    this.taskService.Tasks_delete(id).subscribe(() => { this.tasks = this.tasks.filter(task => task.id != id) })

  }
  persistTask() {
    this.taskService.persist(this.myTask).subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
    });
  }

  resetTask() {
    this.myTask = {
      label: '',
      completed: false
    }
  }


  completedTask(tasks: Task) {
    this.taskService.completed(tasks.id, tasks.completed)
      .subscribe(() => {
        tasks.completed = !tasks.completed
      })
  }






}
