import express from "express";
import {CommandTaskCreate} from "../model/commands/CommandTaskCreate";
import {randomUUID} from "crypto";
import {CreateHandler} from "../core/commandHandler/CreateHandler";
import {KafkaService} from "../kafka-engine/kafka.service";
import {KafkaEngine} from "../kafka-engine/kafka-engine";
import {first} from "rxjs";

export class ApiRouters {

    private app = express();
    private kafkaPrefix: string = process.env["KAFKA_PREFIX"] || "dev";

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

            KafkaService
                .getInstance()
                .produceOn(
                    `${this.kafkaPrefix}-commands`,
                    JSON.stringify(commandCreate)
                );

            KafkaEngine
                .start()
                .eventCreateUpdated$
                .pipe(first())
                .subscribe((val) => {
                    res.send(val);
                });
        });

        this.app.listen(3000, () => {
            console.log(`Application exemple à l'écoute sur le port 3000!`);
        });
    }
}