import { Schema, model, Document } from 'mongoose';

interface FlightBooking extends Document {
  userId: Schema.Types.ObjectId;
  flightId: Schema.Types.ObjectId;
  bookingDate: Date;
  seatNumber?: string;
  status: 'Booked' | 'Confirmed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
}

const FlightBookingSchema = new Schema<FlightBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now, required: true },
  seatNumber: { type: String },
  status: { 
    type: String, 
    enum: ['Booked', 'Confirmed', 'Cancelled'], 
    default: 'Booked' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed'], 
    default: 'Pending' 
  }
}, { timestamps: true });

const FlightBookingModel = model<FlightBooking>('FlightBooking', FlightBookingSchema);

export default FlightBookingModel;
