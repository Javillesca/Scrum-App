import { TaskItem } from './tastk.model';

export class TaskList {
    id: number;
    title: string;
    score: number;
    createdIn: Date;
    finishedIn: Date;
    status: number;
    items: TaskItem[];

    constructor(title: string, score: number) {
        this.title = title;
        this.score = score;

        this.id = new Date().getTime();
        this.createdIn = new Date();
        this.status = 1;
        this.items = [];

    }
}