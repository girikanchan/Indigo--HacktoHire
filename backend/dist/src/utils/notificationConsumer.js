"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.default.EMAIL_USERNAME,
        pass: config_1.default.EMAIL_NODEMAILER_PASSWORD,
    },
});
const sendEmail = (notification) => {
    const mailOptions = {
        from: config_1.default.EMAIL_USERNAME,
        to: notification.userEmail,
        subject: 'Flight Notification',
        text: `Message: ${notification.message}\nDelivery Method: ${notification.deliveryMethod}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
};
callback_api_1.default.connect(config_1.default.RABBITMQ_URL, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = 'notifications';
        channel.assertQueue(queue, {
            durable: true,
        });
        console.log('Waiting for messages in %s', queue);
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const notification = JSON.parse(msg.content.toString());
                console.log('Received:', notification);
                sendEmail(notification);
                channel.ack(msg);
            }
        });
    });
});
//# sourceMappingURL=notificationConsumer.js.map