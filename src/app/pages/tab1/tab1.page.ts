import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskList } from 'src/app/models/tasks-list.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tasks: TaskList[] = [];

  constructor( public tasksService: TasksService,
               private router: Router,
               private alertController: AlertController ) {
    this.tasks = tasksService.tasks;
  }

  async addTask() {

    const alert = await this.alertController.create({
      header: 'Alert',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la tarea'
        },
        {
          name: 'score',
          type: 'number',
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
          text: 'Crear',
          handler: (data) => {
            if ( data.title.length === 0 ) {
              return;
            }

            const listId = this.tasksService.createTaskList(data.title, data.score);
            console.log('tab1: ' + listId);
            this.router.navigateByUrl(`/tabs/tab1/add-task/${ listId }`);
          }
        }
      ]
    });

    alert.present();

  }

}
