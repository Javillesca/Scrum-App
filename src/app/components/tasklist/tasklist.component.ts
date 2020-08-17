import { Component, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskList } from 'src/app/models/tasks-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent {

  @Input() view = 1;

  status: number;

  constructor( public tasksService: TasksService,
               private router: Router ) {
  }

  openTaskList( taskList: TaskList) {
    console.log('openTaskList: ' +  taskList.id);

    this.router.navigateByUrl(`/tabs/tab${this.view}/add-task/${ taskList.id }`);
  }

}
