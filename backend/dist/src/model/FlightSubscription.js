"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlightSubscriptionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    flightId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Flight', required: true },
}, { timestamps: true });
const FlightSubscriptionModel = (0, mongoose_1.model)('FlightSubscription', FlightSubscriptionSchema);
exports.default = FlightSubscriptionModel;
//# sourceMappingURL=FlightSubscription.js.map