"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlightSchema = new mongoose_1.Schema({
    flightNumber: { type: String, required: true },
    status: { type: String, required: true },
    gate: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    departureAirport: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Airport', required: true },
    arrivalAirport: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Airport', required: true },
}, { timestamps: true });
const FlightModel = (0, mongoose_1.model)('Flight', FlightSchema);
exports.default = FlightModel;
//# sourceMappingURL=flight.js.map