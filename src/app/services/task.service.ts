import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = " http://localhost:3000/tasks";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Task[]>(this.url);
  }
  Tasks_delete(id: number | undefined) {
    const url_api = `${this.http}/${id}`;
    return this.http.delete(url_api);
  }
  persist(task: Task) {
    return this.http.post<Task>(this.url, task);
  }

  completed(id: any, completed: any) {
    const url_api = `${this.http}/${id}`;
    return this.http.patch(url_api, { completed: !completed });
  }


}