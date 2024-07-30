import { Router } from 'express';
import userRoutes from '../backend/src/routes/user';
import airportRoutes from '../backend/src/routes/airport';
import flightRoutes from '../backend/src/routes/flight';
import bookingRoutes from '../backend/src/routes/booking';


const router = Router();

router.use('/user',userRoutes);
router.use('/airport',airportRoutes);
router.use('/flight',flightRoutes);
router.use('/booking',bookingRoutes);

export default router;
