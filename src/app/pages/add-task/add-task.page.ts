import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TaskList } from '../../models/tasks-list.model';
import { TaskItem } from '../../models/tastk.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage {

  tasklist: TaskList;
  nameItem = '';

  constructor(private  tasksService: TasksService,
              private actRpite: ActivatedRoute,
              private router: Router,
              private alertController: AlertController) {
    const listId = this.actRpite.snapshot.paramMap.get('listId');
    this.tasklist = this.tasksService.getTaskList(listId);
    console.log('AddTaskPage: ' + listId);
  }


  addItems() {

    if ( this.nameItem.length === 0) {
      return;
    }
    const newTask = new TaskItem(this.nameItem);
    this.tasklist.items.push(newTask);

    this.nameItem = '';
    this.statusChange(this.tasklist);

  }

  statusChange( task: TaskList) {

    const pendingTasks = this.tasklist.items.filter( taskData => !taskData.completed ).length;
    console.log('statusChange: ' + this.tasklist.status);
    if ( pendingTasks === 0 ) {
      this.tasklist.status = 3;
      this.tasklist.finishedIn = new Date();

    } else if ( pendingTasks === this.tasklist.items.length) {
      this.tasklist.status = 1;
      this.tasklist.finishedIn = null;
    } else {
      this.tasklist.status = 2;
      this.tasklist.finishedIn = null;
    }
    this.tasksService.saveStorage();

    console.log(this.tasklist);
  }

   async editTitle(tasklist: TaskList) {
    const alert = await this.alertController.create({
      header: 'Editar',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: tasklist.title,
          placeholder: 'Nombre de la tarea'
        },
        {
          name: 'score',
          type: 'number',
          value: tasklist.score,
          placeholder: 'Puntuación'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {
            if ( data.title.length === 0 ) {
              return;
            }
            tasklist.title = data.title;
            tasklist.score = data.score;
            this.tasksService.saveStorage();
          }
        }
      ]
    });

    alert.present();
  }

  deleteTask( i: number ) {
    this.tasklist.items.splice(i, 1);
    this.statusChange(this.tasklist);
  }

  deleteList( tasklist: TaskList ) {
    console.log('deleteList: ' + tasklist);
    this.tasksService.deleteTaskList( tasklist );
    this.router.navigateByUrl('/tabs/tab1');
  }

}
