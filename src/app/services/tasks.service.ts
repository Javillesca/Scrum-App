import { Injectable } from '@angular/core';
import { TaskList } from '../models/tasks-list.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: TaskList[] = [];

  constructor() {
    this.loadStorage();
  }

  createTaskList(title: string, score: number) {

    const newList = new TaskList(title, score);
    this.tasks.push(newList);
    this.saveStorage();
    console.log('createTaskList: ' + JSON.stringify(this.tasks));
    return newList.id;

  }

  getTaskList( listId: string | number ) {

    const id = Number(listId);

    return this.tasks.find( task => task.id === id );
  }

  saveStorage() {

    localStorage.setItem('data', JSON.stringify(this.tasks));

  }

  loadStorage() {

    const data = localStorage.getItem('data');

    if ( data ) {
      this.tasks = JSON.parse(localStorage.getItem('data'));
    } else {
      this.tasks = [];
    }

  }

  deleteTaskList(taskList: TaskList) {

    this.tasks = this.tasks.filter( tasks => tasks.id !== taskList.id );
    console.log('deleteTaskList: ' + this.tasks);
    this.saveStorage();

  }

}
