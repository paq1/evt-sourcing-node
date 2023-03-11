import {ontology} from "../../ontology";

export interface CommandTask {
    id: string;
    kind: string;
}

export const commandTaskOntology = ontology + ":command-task";