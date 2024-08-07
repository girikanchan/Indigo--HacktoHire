import { Schema, model, Document } from 'mongoose';

interface Notification extends Document {
  flightId?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  bookingId?: Schema.Types.ObjectId;
  message: string;
  sentAt: Date;
  deliveryMethod: string;
}

const NotificationSchema = new Schema<Notification>({
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight'},
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: {type: Schema.Types.ObjectId,ref: 'FlightBooking'},
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  deliveryMethod: { type: String, required: true },
}, { timestamps: true });

const NotificationModel = model<Notification>('Notification', NotificationSchema);

export default NotificationModel;
