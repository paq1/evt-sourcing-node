"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_node_1 = __importDefault(require("kafka-node"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let client = new kafka_node_1.default.KafkaClient();
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
});
