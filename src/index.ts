import {KafkaEngine} from "./kafka-engine/kafka-engine";
import {config} from "dotenv";
import {CommandTaskCreate} from "./model/commands/CommandTaskCreate";
import {randomUUID} from "crypto";
import {ApiRouters} from "./api/ApiRouters";

config();
KafkaEngine.start();
ApiRouters.start();

let commandCreate = new CommandTaskCreate(randomUUID(), "toto");

console.log(commandCreate)