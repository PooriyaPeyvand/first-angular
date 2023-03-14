import { Component , Input , Output , EventEmitter , Injectable } from '@angular/core';
import { t_todos } from 'utils/types';

@Injectable({
  providedIn : 'root'
})

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  @Input() todo : t_todos | undefined;
  @Input() handleToggleCompleted : Function | undefined = undefined
  @Input() handleShadowDelete : Function | undefined = undefined
  @Output() onUrlChange = new EventEmitter<t_todos>();



  handleChangeUrl = ()=>{
    this.onUrlChange.emit(this.todo)
  }
}
