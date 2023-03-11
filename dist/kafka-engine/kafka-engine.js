"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaEngine = void 0;
const kafka_node_1 = __importDefault(require("kafka-node"));
class KafkaEngine {
    constructor() {
        this.client = new kafka_node_1.default.KafkaClient();
        // private produceur = new kafka.Producer(this.client);
        this.groupName = process.env["KAFKA_GROUP_ID"] || "defaultAppName";
        this.consumerOptions = {
            kafkaHost: '127.0.0.1:9092',
            groupId: this.groupName,
            sessionTimeout: 15000,
            protocol: ['roundrobin'],
            fromOffset: 'earliest'
        };
        this.consumer = new kafka_node_1.default.ConsumerGroup(Object.assign({ id: "consumer1" }, this.consumerOptions), [
            'topic1',
            'topic2'
        ]);
        this.startListen();
        console.log("started");
        console.log(process.env["KAFKA_GROUP_ID"]);
    }
    static start() {
        if (!KafkaEngine.instance) {
            KafkaEngine.instance = new KafkaEngine();
        }
        return KafkaEngine.instance;
    }
    startListen() {
        this.consumer.on('message', function (message) {
            console.log(message);
        });
    }
}
exports.KafkaEngine = KafkaEngine;
