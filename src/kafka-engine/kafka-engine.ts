import kafka, {KeyedMessage} from "kafka-node"

export class KafkaEngine {

    private static instance: KafkaEngine;
    private groupName: string = process.env["KAFKA_GROUP_ID"] || "defaultAppName";
    private kafkaPrefix: string = process.env["KAFKA_PREFIX"] || "dev";


    private consumerOptions: kafka.ConsumerGroupOptions = {
        kafkaHost: '127.0.0.1:9092',
        groupId: this.groupName,
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        fromOffset: 'earliest'
    };

    private consumer = new kafka.ConsumerGroup(
        Object.assign({id: "consumer1"} ,this.consumerOptions),
        [
            'topic1',
            'topic2',
            `${this.kafkaPrefix}-commands`,
            `${this.kafkaPrefix}-events`,
            `${this.kafkaPrefix}-results`
        ]
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
            console.log("consumed")
            console.log(message);
        });
    }
}