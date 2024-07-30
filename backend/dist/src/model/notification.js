"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    flightId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Flight' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FlightBooking' },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    deliveryMethod: { type: String, required: true },
}, { timestamps: true });
const NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
exports.default = NotificationModel;
//# sourceMappingURL=notification.js.map