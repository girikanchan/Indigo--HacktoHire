import { Router } from 'express';
import {
  bookFlight,
  cancelBooking,
  updateBooking,
} from '../controller/booking.controller'; // Adjust path as needed

const router = Router();

router.post('/book', bookFlight);

router.delete('/:bookingId/cancel', cancelBooking);

router.put('/:bookingId/update', updateBooking);

export default router;
