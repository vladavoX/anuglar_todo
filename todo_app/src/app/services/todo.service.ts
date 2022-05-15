import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private client: HttpClient) { }

  getTodos() {
    return this.client.get("http://localhost:3000/todos");
  }

  getTodo(id: number) {
    return this.client.get(`http://localhost:3000/todos/${id}`);
  }

  createTodo(todo: Todo) {
    return this.client.post("http://localhost:3000/todos", todo);
  }

  updateTodo(id: number, todo: Todo) {
    return this.client.put(`http://localhost:3000/todos/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.client.delete(`http://localhost:3000/todos/${id}`);
  }
}
