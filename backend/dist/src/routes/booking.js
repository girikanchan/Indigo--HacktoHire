"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controller/booking.controller"); // Adjust path as needed
const router = (0, express_1.Router)();
router.post('/book', booking_controller_1.bookFlight);
router.delete('/:bookingId/cancel', booking_controller_1.cancelBooking);
router.put('/:bookingId/update', booking_controller_1.updateBooking);
exports.default = router;
//# sourceMappingURL=booking.js.map