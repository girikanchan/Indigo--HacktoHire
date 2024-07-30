"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAirportByCode = exports.updateAirportByCode = exports.getAirportByCode = exports.getAllAirports = exports.registerAirport = void 0;
const airport_1 = __importDefault(require("../model/airport"));
const customError_1 = __importDefault(require("../utils/customError"));
const registerAirport = async (req, res, next) => {
    try {
        const { name, code, location, timezone, status } = req.body;
        const newAirport = new airport_1.default({ name, code, location, timezone, status });
        await newAirport.save();
        res.status(201).json(newAirport);
    }
    catch (error) {
        next(new customError_1.default(error.message, 400));
    }
};
exports.registerAirport = registerAirport;
const getAllAirports = async (_req, res, next) => {
    try {
        const airports = await airport_1.default.find();
        res.status(200).json(airports);
    }
    catch (error) {
        next(error.message);
    }
};
exports.getAllAirports = getAllAirports;
const getAirportByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const airport = await airport_1.default.findOne({ code });
        if (!airport) {
            return res.status(404).json({ message: 'Airport not found' });
        }
        res.status(200).json(airport);
    }
    catch (error) {
        next(error.message);
    }
};
exports.getAirportByCode = getAirportByCode;
const updateAirportByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const updatedAirport = await airport_1.default.findOneAndUpdate({ code }, req.body, { new: true, runValidators: true });
        if (!updatedAirport) {
            return res.status(404).json({ message: 'Airport not found' });
        }
        res.status(200).json(updatedAirport);
    }
    catch (error) {
        next(error);
    }
};
exports.updateAirportByCode = updateAirportByCode;
const deleteAirportByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const deletedAirport = await airport_1.default.findOneAndDelete({ code });
        if (!deletedAirport) {
            return res.status(404).json({ message: 'Airport not found' });
        }
        res.status(200).json({ message: 'Airport deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAirportByCode = deleteAirportByCode;
//# sourceMappingURL=airport.controller.js.map