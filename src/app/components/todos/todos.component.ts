import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getSubscribeData } from 'utils';
import { t_todos } from 'utils/types';
import { t_createTodo } from '../add-todo/add-todo.component';

type handleType = (todo: t_todos) => void;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  showNew: boolean = false;
  todos: t_todos[] = [];
  constructor(private http: HttpClient) {}
  getData = () => {
    return this.http.get<t_todos[]>('https://jsonplaceholder.typicode.com/todos');
  };
  handleToggleNewTodoForm = () => {
    this.showNew = !this.showNew;
  };

  ngOnInit(): void {
    this.getData().subscribe((value) => {
      this.todos = getSubscribeData(value);
    });
  }

  handleChangeUrl = (todo: t_todos) => {
    window.history.pushState('', '', `/${todo.id}`);
  };

  handleToggleCompleted = (todo: t_todos) => {
    todo.completed = !todo.completed;
  };

  handleShadowDelete = (todo: t_todos) => {
    todo.shadowDelete = !todo.shadowDelete;

    new Promise((resolve, reject) => {
      const result = window.prompt('are you sure to delete this todo');
      if (result) {
        console.log(result);
        this.handleDeleteTodo(todo);
        resolve('ok');
      } else {
        reject('cancelled');
      }
    });
  };
  handleDeleteTodo = (todo: t_todos) => {
    this.todos = this.todos.filter((item) => item.id !== todo.id);
  };

  handleCreateTodo = (todo: t_createTodo) => {
    console.log(todo);
    const makeTodo = { ...todo, id: Math.random() * 1000000, shadowDelete: false };
    console.log(makeTodo);
    this.todos.unshift(makeTodo);
  };
}
