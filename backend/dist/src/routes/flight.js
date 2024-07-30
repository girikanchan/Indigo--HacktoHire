"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_controller_1 = require("../controller/flight.controller"); // Adjust the path as needed
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create', auth_1.auth, flight_controller_1.createFlight);
router.put('/update/:id', auth_1.auth, flight_controller_1.updateFlight);
router.get('/get/:id', auth_1.auth, flight_controller_1.getFlightById);
router.delete('/delete/:id', auth_1.auth, flight_controller_1.deleteFlight);
router.get('/getall', auth_1.auth, flight_controller_1.getAllFlights);
exports.default = router;
//# sourceMappingURL=flight.js.map