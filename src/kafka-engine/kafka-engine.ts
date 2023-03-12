import kafka, {Consumer, KeyedMessage} from "kafka-node"
import {KafkaService} from "./kafka.service";
import {consumers} from "stream";

export class KafkaEngine {

    private static instance: KafkaEngine;
    private groupName: string = process.env["KAFKA_GROUP_ID"] || "defaultAppName";
    private kafkaPrefix: string = process.env["KAFKA_PREFIX"] || "dev";

    private consumerOption = {
        autoCommit: true,
        groupId: this.groupName
    };

    private topics = [
        { topic: 'topic1', partition: 0 },
        { topic: 'topic2', partition: 0 },
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
            console.log("consumed main")
            console.log(message);
        });

        this.consumerCreate.on('message', function (message) {
            console.log("consumed create")
            console.log(message);
        });
    }
}