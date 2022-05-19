import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: any = [];
  completed = false;

  todoForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    author: new FormControl(this.loginService.getUser().username, Validators.required),
    completed: new FormControl(false)
  })

  constructor(private todosService: TodoService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  toggleTodo(i: any) {
    this.todos[i].completed = !this.todos[i].completed;
    this.todosService.updateTodo(this.todos[i].id, this.todos[i]).subscribe();
  }

  deleteTodo(i: any) {
    this.todosService.deleteTodo(this.todos[i].id).subscribe(() => {
      this.todos.splice(i, 1);
    })
  }

  onSubmit() {
    this.todosService.createTodo(this.todoForm.value).subscribe(todo => {
      console.log(this.todoForm.value)
      this.todos.push(todo);
      this.todoForm.value.id = null;
      this.todoForm.value.title = null;
      this.todoForm.value.completed = false;
      this.todoForm.value.author = this.loginService.getUser().username;

      document.querySelector("input")!.value = "";
    })
  }
}
