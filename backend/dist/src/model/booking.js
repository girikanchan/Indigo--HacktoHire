"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlightBookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    flightId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Flight', required: true },
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
const FlightBookingModel = (0, mongoose_1.model)('FlightBooking', FlightBookingSchema);
exports.default = FlightBookingModel;
//# sourceMappingURL=booking.js.map