import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TasklistComponent } from './tasklist/tasklist.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    TasklistComponent
  ],
  exports: [
    TasklistComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
