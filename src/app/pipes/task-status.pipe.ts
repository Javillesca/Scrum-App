import { Pipe, PipeTransform } from '@angular/core';
import { TaskList } from '../models/tasks-list.model';

@Pipe({
  name: 'taskStatus',
  pure: false
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasksList: TaskList[], status: number = 1): TaskList[] {
      return tasksList.filter(tasks => tasks.status === status );
  }

}
