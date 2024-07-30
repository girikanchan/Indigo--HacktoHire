import { NextFunction, Request, Response } from 'express';
import FlightModel from '../model/flight'; // Adjust the path as needed
import CustomError from '../utils/customError';

export const createFlight = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { flightNumber, status, gate, departureTime, arrivalTime, departureAirport, arrivalAirport } = req.body;

    const newFlight = new FlightModel({
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
  } catch (error) {
    next(new CustomError('Error creating flight'));
  }
};

export const updateFlight = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const updatedFlight = await FlightModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFlight) {
      next(new CustomError('Flight not found',404));
    }

    res.status(200).json(updatedFlight);
  } catch (error) {
    next(new CustomError('Error updating flight'));
  }
};

export const getFlightById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const flight = await FlightModel.findById(id).populate('departureAirport arrivalAirport');

    if (!flight) {
        next(new CustomError('Flight not found',404));
    }

    res.status(200).json(flight);
  } catch (error) {
    next(new CustomError('Error retrieving flight'));
  }
};

export const deleteFlight = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const deletedFlight = await FlightModel.findByIdAndDelete(id);

    if (!deletedFlight) {
        next(new CustomError('Flight not found',404));
    }

    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    next(new CustomError('Error deleting flight'));
  }
};

export const getAllFlights = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const flights = await FlightModel.find().populate('departureAirport arrivalAirport');
    res.status(200).json(flights);
  } catch (error) {
    next(new CustomError('Error retrieving flight'));
  }
};
