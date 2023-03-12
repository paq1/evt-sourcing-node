import kafka, {Consumer} from "kafka-node"
import {Observable, Subject} from "rxjs";
import {CommandTask} from "../model/commands/CommandTask";
import {CommandTaskCreate, commandTaskCreateOntology} from "../model/commands/CommandTaskCreate";
import {CreateHandler} from "../core/commandHandler/CreateHandler";
import {randomUUID} from "crypto";

export class KafkaEngine {

    evenementCreateSubject$: Subject<any> = new Subject<any>();
    eventCreateUpdated$: Observable<any> = this.evenementCreateSubject$.asObservable();

    private static instance: KafkaEngine;
    private groupName: string = process.env["KAFKA_GROUP_ID"] || "defaultAppName";
    private kafkaPrefix: string = process.env["KAFKA_PREFIX"] || "dev";

    private consumerOption = {
        autoCommit: true,
        groupId: this.groupName
    };

    private topics = [
        { topic: `${this.kafkaPrefix}-commands`, partition: 0 },
        { topic: `${this.kafkaPrefix}-events`, partition: 0 },
        { topic: `${this.kafkaPrefix}-results`, partition: 0 }
    ];

    private consumer = new Consumer(
        new kafka.KafkaClient(),
        this.topics,
        this.consumerOption
    );

    private consumerCreate = new Consumer(
        new kafka.KafkaClient(),
        this.topics,
        this.consumerOption
    );


    private constructor() {
        this.startListen();
        console.log("started");
        console.log(process.env["KAFKA_GROUP_ID"]);

    }

    static start(): KafkaEngine {
        if (!KafkaEngine.instance) {
            KafkaEngine.instance = new KafkaEngine();
        }
        return KafkaEngine.instance;
    }

    private startListen(): void {
        this.consumer.on('message', function (message) {
            console.log("consumed main");
            console.log(message);
        });

        this.consumerCreate.on('message', function (message) {
            console.log("consumed create");
            console.log(message);

            let command = JSON.parse(message.value as string) as CommandTaskCreate;
            if (command.kind === commandTaskCreateOntology) {
                let createHandler = new CreateHandler();
                let evt = createHandler.toEvent(command, randomUUID());
                // todo reducer
                // todo ecrire en db journal et store
                // todo retourner la concat de l'evt et entity au format JSON api
                KafkaEngine
                    .start()
                    .evenementCreateSubject$
                    .next(evt);
            } else {
                KafkaEngine
                    .start()
                    .evenementCreateSubject$
                    .next("500 : erreur mapping object");
            }
        });
    }
}