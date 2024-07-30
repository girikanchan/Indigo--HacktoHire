import { Request, Response,NextFunction } from 'express';
import FlightBooking from '../model/booking'; // Adjust path as needed
import FlightSubscriptionModel from '../model/FlightSubscription'; // Adjust path as needed
import CustomError  from '../utils/customError'; // Adjust path as needed

export const bookFlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, flightId, seatNumber } = req.body;

    const booking = new FlightBooking({
      userId,
      flightId,
      seatNumber,
    });

    await booking.save();

    await FlightSubscriptionModel.create({ userId, flightId });

    res.status(201).json({
      message: 'Flight booked successfully!',
      booking,
    });
  } catch (error) {
    next(new CustomError('Failed to book flight', 500));
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;

    const booking = await FlightBooking.findByIdAndUpdate(
      bookingId,
      { status: 'Cancelled' },
      { new: true }
    );

    if (!booking) {
      return next(new CustomError('Booking not found', 404));
    }

    await FlightSubscriptionModel.findOneAndDelete({
      userId: booking.userId,
      flightId: booking.flightId,
    });

    res.status(200).json({
      message: 'Booking cancelled and subscription removed!',
      booking,
    });
  } catch (error) {
    next(new CustomError('Failed to cancel booking', 500));
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    const updates = req.body;

    const booking = await FlightBooking.findByIdAndUpdate(
      bookingId,
      updates,
      { new: true }
    );

    if (!booking) {
      return next(new CustomError('Booking not found', 404));
    }

    res.status(200).json({
      message: 'Booking updated successfully!',
      booking,
    });
  } catch (error) {
    next(new CustomError('Failed to update booking', 500));
  }
};
