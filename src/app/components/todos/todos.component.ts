import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { getSubscribeData } from 'utils';
import { t_todos } from 'utils/types';

type handleType = (todo : t_todos)=> void;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})



export class TodosComponent {
  todos : t_todos[] = [];
  constructor(private http : HttpClient) {
  }
;

  getData = ()=> {
return this.http.get<t_todos[]>('https://jsonplaceholder.typicode.com/todos')
};

ngOnInit(): void {
     this.getData().subscribe((value)=> {
      this.todos = getSubscribeData(value);
     })
  }

  handleChangeUrl = (todo : t_todos)=> {
    window.history.pushState('' , '' , `/${ todo.id }`)
  }

  handleToggleCompleted = (todo : t_todos)=> {
    todo.completed = !todo.completed
  };

   handleShadowDelete = (todo : t_todos) => {
    todo.shadowDelete = !todo.shadowDelete;

     new Promise((resolve , reject)=> {

      const result = window.prompt('todo will delete in 3s');
      if(result) {
        console.log(result)
        this.handleDeleteTodo(todo)
        resolve("ok");
      }else {
        reject("cancelled")
      }
    })
  }
  handleDeleteTodo = (todo : t_todos)=> {
    this.todos = this.todos.filter(item => item.id !== todo.id)
  };


}
