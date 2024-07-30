import amqp from 'amqplib/callback_api';
import nodemailer from 'nodemailer';
import config from '../../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USERNAME,
    pass: config.EMAIL_NODEMAILER_PASSWORD,
  },
});

const sendEmail = (notification: {
  userEmail: string;
  message: string;
  deliveryMethod: string;
}) => {
  const mailOptions = {
    from: config.EMAIL_USERNAME,
    to: notification.userEmail,
    subject: 'Flight Notification',
    text: `Message: ${notification.message}\nDelivery Method: ${notification.deliveryMethod}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

amqp.connect(config.RABBITMQ_URL, (error0, connection) => {
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
