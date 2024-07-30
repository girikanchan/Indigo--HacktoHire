"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = exports.cancelBooking = exports.findBookingIdUserId = exports.bookFlight = void 0;
const booking_1 = __importDefault(require("../model/booking"));
const FlightSubscription_1 = __importDefault(require("../model/FlightSubscription"));
const customError_1 = __importDefault(require("../utils/customError"));
const notificationProducer_1 = __importDefault(require("../utils/notificationProducer"));
const user_controller_1 = require("./user.controller");
const bookFlight = async (req, res, next) => {
    try {
        const { userId, flightId, seatNumber } = req.body;
        const userEmail = await (0, user_controller_1.findUserEmail)(userId, next);
        if (!userId || !flightId || !seatNumber || !userEmail) {
            return next(new customError_1.default('Missing required fields', 400));
        }
        const booking = new booking_1.default({ userId, flightId, seatNumber });
        await booking.save();
        await FlightSubscription_1.default.create({ userId, flightId });
        try {
            await (0, notificationProducer_1.default)({
                flightId,
                userId,
                message: 'Flight booked successfully!',
                sentAt: new Date(),
                deliveryMethod: 'email',
                userEmail
            });
        }
        catch (notificationError) {
            console.error('Notification failed:', notificationError);
        }
        res.status(201).json({
            message: 'Flight booked successfully!',
            booking,
        });
    }
    catch (error) {
        next(new customError_1.default('Failed to book flight', 500));
    }
};
exports.bookFlight = bookFlight;
const findBookingIdUserId = async (bookingId) => {
    const booking = await booking_1.default.findById(bookingId);
    return booking ? booking.userId.toString() : null;
};
exports.findBookingIdUserId = findBookingIdUserId;
const cancelBooking = async (req, res, next) => {
    const { bookingId } = req.params;
    try {
        const userId = await (0, exports.findBookingIdUserId)(bookingId);
        if (!userId) {
            return next(new customError_1.default('Booking not found', 404));
        }
        const userEmail = await (0, user_controller_1.findUserEmail)(userId, next);
        if (!userEmail) {
            return next(new customError_1.default('User email is required', 400));
        }
        const booking = await booking_1.default.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true });
        if (!booking) {
            return next(new customError_1.default('Booking not found', 404));
        }
        await FlightSubscription_1.default.findOneAndDelete({
            userId: booking.userId,
            flightId: booking.flightId,
        });
        try {
            await (0, notificationProducer_1.default)({
                bookingId: booking._id.toString(),
                userId: booking.userId.toString(),
                message: 'Flight booking cancelled.',
                sentAt: new Date(),
                deliveryMethod: 'email',
                userEmail
            });
        }
        catch (notificationError) {
            console.error('Notification failed:', notificationError);
        }
        res.status(200).json({
            message: 'Booking cancelled and subscription removed!',
            booking,
        });
    }
    catch (error) {
        next(new customError_1.default('Failed to cancel booking', 500));
    }
};
exports.cancelBooking = cancelBooking;
const updateBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const updates = req.body;
        const userId = await (0, exports.findBookingIdUserId)(bookingId);
        if (!userId) {
            return next(new customError_1.default('Booking not found', 404));
        }
        const userEmail = await (0, user_controller_1.findUserEmail)(userId, next);
        if (!userEmail) {
            return next(new customError_1.default('User email is required', 400));
        }
        const booking = await booking_1.default.findByIdAndUpdate(bookingId, updates, { new: true });
        if (!booking) {
            return next(new customError_1.default('Booking not found', 404));
        }
        try {
            await (0, notificationProducer_1.default)({
                bookingId: booking._id.toString(),
                userId: booking.userId.toString(),
                message: 'Flight booking updated.',
                sentAt: new Date(),
                deliveryMethod: 'email',
                userEmail
            });
        }
        catch (notificationError) {
            console.error('Notification failed:', notificationError);
        }
        res.status(200).json({
            message: 'Booking updated successfully!',
            booking,
        });
    }
    catch (error) {
        next(new customError_1.default('Failed to update booking', 500));
    }
};
exports.updateBooking = updateBooking;
//# sourceMappingURL=booking.controller.js.map