"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const airportSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    timezone: { type: String, required: true },
    status: { type: Boolean, required: true, default: true }
}, { timestamps: true });
const AirportModel = (0, mongoose_1.model)('Airport', airportSchema);
exports.default = AirportModel;
//# sourceMappingURL=airport.js.map