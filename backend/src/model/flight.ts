import { Schema, model, Document } from 'mongoose';

interface Flight extends Document {
  flightNumber: string;
  status: string;
  gate: string;
  departureTime: Date;
  arrivalTime: Date;
  departureAirport: Schema.Types.ObjectId;
  arrivalAirport: Schema.Types.ObjectId;
}

const FlightSchema = new Schema<Flight>({
  flightNumber: { type: String, required: true },
  status: { type: String, required: true },
  gate: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  departureAirport: { type: Schema.Types.ObjectId, ref: 'Airport', required: true },
  arrivalAirport: { type: Schema.Types.ObjectId, ref: 'Airport', required: true },
}, { timestamps: true });

const FlightModel = model<Flight>('Flight', FlightSchema);

export default FlightModel;
