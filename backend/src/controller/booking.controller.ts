import { Request, Response, NextFunction } from 'express';
import FlightBooking from '../model/booking';
import FlightSubscriptionModel from '../model/FlightSubscription';
import CustomError from '../utils/customError';
import sendNotification from '../utils/notificationProducer';
import { findUserEmail } from './user.controller';

export const bookFlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, flightId, seatNumber} = req.body;
    const userEmail = await findUserEmail(userId,next);

    if (!userId || !flightId || !seatNumber || !userEmail) {
      return next(new CustomError('Missing required fields', 400));
    }

    const booking = new FlightBooking({ userId, flightId, seatNumber });
    await booking.save();

    await FlightSubscriptionModel.create({ userId, flightId });

    try {
      await sendNotification({
        flightId,
        userId,
        message: 'Flight booked successfully!',
        sentAt: new Date(),
        deliveryMethod: 'email',
        userEmail
      });
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
    }

    res.status(201).json({
      message: 'Flight booked successfully!',
      booking,
    });
  } catch (error) {
    next(new CustomError('Failed to book flight', 500));
  }
};

export const findBookingIdUserId = async (bookingId: string): Promise<string | null> => {
  const booking = await FlightBooking.findById(bookingId);
  return booking ? booking.userId.toString(): null;
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  const { bookingId } = req.params;
  
  try {
    const userId = await findBookingIdUserId(bookingId);
    if (!userId) {
      return next(new CustomError('Booking not found', 404));
    }

    const userEmail = await findUserEmail(userId,next);
    if (!userEmail) {
      return next(new CustomError('User email is required', 400));
    }

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

    try {
      await sendNotification({
        bookingId: booking._id.toString(),
        userId: booking.userId.toString(),
        message: 'Flight booking cancelled.',
        sentAt: new Date(),
        deliveryMethod: 'email',
        userEmail
      });
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
    }

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
    const userId = await findBookingIdUserId(bookingId);
    if (!userId) {
      return next(new CustomError('Booking not found', 404));
    }

    const userEmail = await findUserEmail(userId,next);
    if (!userEmail) {
      return next(new CustomError('User email is required', 400));
    }

    const booking = await FlightBooking.findByIdAndUpdate(
      bookingId,
      updates,
      { new: true }
    );

    if (!booking) {
      return next(new CustomError('Booking not found', 404));
    }

    try {
      await sendNotification({
        bookingId: booking._id.toString(),
        userId: booking.userId.toString(),
        message: 'Flight booking updated.',
        sentAt: new Date(),
        deliveryMethod: 'email',
        userEmail
      });
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
    }

    res.status(200).json({
      message: 'Booking updated successfully!',
      booking,
    });
  } catch (error) {
    next(new CustomError('Failed to update booking', 500));
  }
};
