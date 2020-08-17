import { NgModule } from '@angular/core';
import { TaskStatusPipe } from './task-status.pipe';


@NgModule({
  declarations: [TaskStatusPipe],
  exports: [
    TaskStatusPipe
  ]
})
export class PipesModule { }
