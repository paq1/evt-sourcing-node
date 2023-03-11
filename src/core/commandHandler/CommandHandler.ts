export interface CommandHandlerCreate<Command, Event> {
    toEvent(cmd: Command, entityId: string): Event;
}


export interface CommandHandlerUpdate<Command, State, Event> {
    toEvent(cmd: Command, entityId: string, entity: State): Event;
}