import kafka, {KeyedMessage} from "kafka-node";

export class KafkaService {

    private static instance: KafkaService;
    private client = new kafka.KafkaClient();
    private produceur = new kafka.Producer(this.client);

    private constructor() {
        this.produceur.on("error",(err) => {
            console.error(err);
        });
    }

    static getInstance(): KafkaService {
        if (!KafkaService.instance) {
            KafkaService.instance = new KafkaService();
        }
        return KafkaService.instance;
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
    // }



    produceOn(topic: string, message: string): void {

        let payload = [
            {
                topic: topic,
                messages: message,
                partition: 0
            }
        ];

        this.produceur.send(payload, (err, data) => {
            console.log(`producer :`);
            console.log(data);
        });
    }

}