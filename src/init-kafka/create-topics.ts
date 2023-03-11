import kafka from "kafka-node"
import {config} from "dotenv";

config();
let client = new kafka.KafkaClient();
const topicsToCreate = [
    {
        topic: `${process.env["KAFKA_PREFIX"]}-commands`,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: `${process.env["KAFKA_PREFIX"]}-events`,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: `${process.env["KAFKA_PREFIX"]}-results`,
        partitions: 1,
        replicationFactor: 1
    }
];

client.createTopics(topicsToCreate, (error, result) => {
    console.log(result);
})