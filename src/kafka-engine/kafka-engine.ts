import kafka, {KeyedMessage} from "kafka-node"

export class KafkaEngine {

    private static instance: KafkaEngine;
    private client = new kafka.KafkaClient();
    // private produceur = new kafka.Producer(this.client);
    private groupName: string = process.env["KAFKA_GROUP_ID"] || "defaultAppName";

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
            'topic2'
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
            console.log(message);
        });
    }

    // private startProduce(): void {
    //     let km = new KeyedMessage("uuid-ici-etc", "message push")
    //     let payload = [
    //         {
    //             topic: 'topic1', messages: 'hi', partition: 0
    //         },
    //         {
    //             topic: 'topic2', messages: ["hello", "world", km]
    //         }
    //     ]
    //     this.produceur.on('ready', () => {
    //         this.produceur.send(payload, (err, data) => {
    //             console.log(data)
    //         });
    //     });
    //
    //     this.produceur.on("error",(err) => {
    //         console.error(err);
    //     })
    // }
}