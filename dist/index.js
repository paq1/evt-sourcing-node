"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_engine_1 = require("./kafka-engine/kafka-engine");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
kafka_engine_1.KafkaEngine.start();
