import { Router } from 'express';
import { createFlight, updateFlight, getFlightById, deleteFlight, getAllFlights } from '../controller/flight.controller'; // Adjust the path as needed
import { auth } from '../middleware/auth';

const router = Router();

router.post('/create', auth,createFlight);
router.put('/update/:id', auth,updateFlight);
router.get('/get/:id', auth,getFlightById);
router.delete('/delete/:id', auth,deleteFlight);
router.get('/getall', auth,getAllFlights);

export default router;
