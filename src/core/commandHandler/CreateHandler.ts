import {CommandHandlerCreate} from "./CommandHandler";
import {TaskEvent} from "../events/TaskEvent";
import {randomUUID} from "crypto";
import {TaskCreateEvent} from "../events/TaskCreateEvent";
import {CommandTaskCreate} from "../../model/commands/CommandTaskCreate";

export class CreateHandler implements CommandHandlerCreate<CommandTaskCreate, TaskEvent> {
    toEvent(cmd: CommandTaskCreate, entityId: string): TaskEvent {
        return new TaskCreateEvent (
            randomUUID(),
            Date.now(),
            cmd.name
        );
    }
}