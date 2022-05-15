import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: any = [];

  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

}
