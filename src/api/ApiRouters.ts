import express from "express";
import {CommandTaskCreate} from "../model/commands/CommandTaskCreate";
import {randomUUID} from "crypto";
import {CreateHandler} from "../core/commandHandler/CreateHandler";
import {KafkaService} from "../kafka-engine/kafka.service";

export class ApiRouters {

    private app = express();

    private static instance: ApiRouters;
    private constructor() {
        this.routes();
    }

    static start(): ApiRouters {
        if (!ApiRouters.instance) {
            ApiRouters.instance = new ApiRouters();
        }
        return ApiRouters.instance;
    }

    private routes(): void {
        this.app.get('/create', (req, res) => {

            // todo a recup dans le body
            let commandCreate = new CommandTaskCreate(randomUUID(), "toto");

            // todo injecter la commande dans le topic kafka
            KafkaService.getInstance().produceOn("topic1", JSON.stringify(commandCreate));

            // todo commandHandler dans la partie kafka
            let commandHandler = new CreateHandler();
            let evt = commandHandler
                .toEvent(commandCreate, randomUUID());

            res.send(evt);
        });

        this.app.listen(3000, () => {
            console.log(`Application exemple à l'écoute sur le port 3000!`);
        });
    }
}