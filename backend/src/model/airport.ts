import { Schema, model, Document } from 'mongoose';

interface Airport extends Document {
  name: string;
  code: string;
  location: string;
  timezone: string;
  status: boolean;
}

const airportSchema = new Schema<Airport>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  timezone: { type: String, required: true },
  status: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const AirportModel = model<Airport>('Airport', airportSchema);

export default AirportModel;
