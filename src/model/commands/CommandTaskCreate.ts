import {CommandTask, commandTaskOntology} from "./CommandTask";

export class CommandTaskCreate implements CommandTask {
    id: string;
    kind: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.kind = commandTaskCreateOntology;
    }
}

export const commandTaskCreateOntology = commandTaskOntology + ":command-task-create";