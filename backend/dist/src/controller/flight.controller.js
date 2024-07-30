"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFlights = exports.deleteFlight = exports.getFlightById = exports.updateFlight = exports.createFlight = void 0;
const flight_1 = __importDefault(require("../model/flight")); // Adjust the path as needed
const customError_1 = __importDefault(require("../utils/customError"));
const createFlight = async (req, res, next) => {
    try {
        const { flightNumber, status, gate, departureTime, arrivalTime, departureAirport, arrivalAirport } = req.body;
        const newFlight = new flight_1.default({
            flightNumber,
            status,
            gate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
        });
        const savedFlight = await newFlight.save();
        res.status(201).json(savedFlight);
    }
    catch (error) {
        next(new customError_1.default('Error creating flight'));
    }
};
exports.createFlight = createFlight;
const updateFlight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedFlight = await flight_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFlight) {
            next(new customError_1.default('Flight not found', 404));
        }
        res.status(200).json(updatedFlight);
    }
    catch (error) {
        next(new customError_1.default('Error updating flight'));
    }
};
exports.updateFlight = updateFlight;
const getFlightById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const flight = await flight_1.default.findById(id).populate('departureAirport arrivalAirport');
        if (!flight) {
            next(new customError_1.default('Flight not found', 404));
        }
        res.status(200).json(flight);
    }
    catch (error) {
        next(new customError_1.default('Error retrieving flight'));
    }
};
exports.getFlightById = getFlightById;
const deleteFlight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedFlight = await flight_1.default.findByIdAndDelete(id);
        if (!deletedFlight) {
            next(new customError_1.default('Flight not found', 404));
        }
        res.status(200).json({ message: 'Flight deleted successfully' });
    }
    catch (error) {
        next(new customError_1.default('Error deleting flight'));
    }
};
exports.deleteFlight = deleteFlight;
const getAllFlights = async (req, res, next) => {
    try {
        const flights = await flight_1.default.find().populate('departureAirport arrivalAirport');
        res.status(200).json(flights);
    }
    catch (error) {
        next(new customError_1.default('Error retrieving flight'));
    }
};
exports.getAllFlights = getAllFlights;
//# sourceMappingURL=flight.controller.js.map