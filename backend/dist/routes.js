"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../backend/src/routes/user"));
const airport_1 = __importDefault(require("../backend/src/routes/airport"));
const flight_1 = __importDefault(require("../backend/src/routes/flight"));
const booking_1 = __importDefault(require("../backend/src/routes/booking"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/airport', airport_1.default);
router.use('/flight', flight_1.default);
router.use('/booking', booking_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map