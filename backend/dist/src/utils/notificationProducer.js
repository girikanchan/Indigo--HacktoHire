"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = __importDefault(require("../../config"));
const sendNotification = async (notification) => {
    try {
        const connection = await amqplib_1.default.connect(config_1.default.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'notifications';
        const msg = JSON.stringify(notification);
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log('Sent:', msg);
        setTimeout(() => {
            connection.close();
        }, 500);
    }
    catch (error) {
        console.error('Error sending notification:', error);
    }
};
exports.default = sendNotification;
//# sourceMappingURL=notificationProducer.js.map