import { Schema, model, Document } from 'mongoose';

interface FlightSubscription extends Document {
  userId: Schema.Types.ObjectId;
  flightId: Schema.Types.ObjectId;
}

const FlightSubscriptionSchema = new Schema<FlightSubscription>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
}, { timestamps: true });

const FlightSubscriptionModel = model<FlightSubscription>('FlightSubscription', FlightSubscriptionSchema);

export default FlightSubscriptionModel;
