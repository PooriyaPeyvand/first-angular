import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { t_todos } from 'utils/types';

export type t_createTodo = Omit<t_todos, 'id'>;

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  @Input() onCreate: (todo: t_createTodo) => void;
  form: FormGroup;

  onSubmit = () => {
    const data: t_createTodo = { title: this.form.value.title, completed: this.form.value.completed };
    console.log(data);
    this.onCreate(data);
  };
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group<t_createTodo>({
      completed: false,
      title: '',
      shadowDelete: false,
    });
  }
}
