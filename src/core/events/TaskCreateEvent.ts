import {TaskEvent, taskEventOntology} from "./TaskEvent";

export class TaskCreateEvent implements TaskEvent {

    id: string;
    kind: string;
    date: number;
    name: string;

    constructor(id: string, date: number, name: string) {
        this.id = id;
        this.kind = taskCreateEventOntology;
        this.date = date;
        this.name = name;
    }

}

export const taskCreateEventOntology: string = taskEventOntology + ":task-event-create"