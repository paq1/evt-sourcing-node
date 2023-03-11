import {KafkaEngine} from "./kafka-engine/kafka-engine";
import {config} from "dotenv";
config();

KafkaEngine.start();
