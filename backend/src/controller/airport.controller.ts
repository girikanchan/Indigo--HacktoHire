import e, { NextFunction, Request, Response } from 'express';
import AirportModel from '../model/airport';
import CustomError from '../utils/customError';

export const registerAirport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, code, location, timezone, status } = req.body;
    const newAirport = new AirportModel({ name, code, location, timezone, status });
    await newAirport.save();
    res.status(201).json(newAirport);
  } catch (error) {
    next(new CustomError(error.message,400));
  }
};

export const getAllAirports = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const airports = await AirportModel.find();
    res.status(200).json(airports);
  } catch (error) {
    next(error.message);
  }
};

export const getAirportByCode = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { code } = req.params;
    const airport = await AirportModel.findOne({ code });
    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.status(200).json(airport);
  } catch (error) {
    next(error.message);
  }
};

export const updateAirportByCode = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { code } = req.params;
    const updatedAirport = await AirportModel.findOneAndUpdate({ code }, req.body, { new: true, runValidators: true });
    if (!updatedAirport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.status(200).json(updatedAirport);
  } catch (error) {
    next(error);
  }
};

export const deleteAirportByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const deletedAirport = await AirportModel.findOneAndDelete({ code });
    if (!deletedAirport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.status(200).json({ message: 'Airport deleted successfully' });
  } catch (error) {
    next(error);
  }
};
