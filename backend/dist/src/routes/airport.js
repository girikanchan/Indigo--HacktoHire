"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airport_controller_1 = require("../controller/airport.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', auth_1.auth, airport_controller_1.registerAirport);
router.get('/getAll', auth_1.auth, airport_controller_1.getAllAirports);
router.get('/get/:code', auth_1.auth, airport_controller_1.getAirportByCode);
router.put('/update/:code', auth_1.auth, airport_controller_1.updateAirportByCode);
router.delete('/delete/:code', auth_1.auth, airport_controller_1.deleteAirportByCode);
exports.default = router;
//# sourceMappingURL=airport.js.map