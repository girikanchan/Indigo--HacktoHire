import amqp from 'amqplib';
import config from '../../config';

const sendNotification = async (notification: {
  flightId?: string;
  bookingId?: string;
  userId: string;
  message: string;
  sentAt: Date;
  deliveryMethod: string;
  userEmail: string;
}) => {
  try {
    const connection = await amqp.connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    const queue = 'notifications';
    const msg = JSON.stringify(notification);

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log('Sent:', msg);
    
    setTimeout(() => {
      connection.close();
    }, 500);

  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendNotification;
