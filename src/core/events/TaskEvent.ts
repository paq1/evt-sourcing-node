import {ontology} from "../../ontology";

export interface TaskEvent {
    id: string;
    date: number;

    kind: string
}

export const taskEventOntology = ontology + ":task-event";