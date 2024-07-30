import { Router } from 'express';
import {
  registerAirport,
  getAllAirports,
  getAirportByCode,
  updateAirportByCode,
  deleteAirportByCode
} from '../controller/airport.controller';
import { auth } from '../middleware/auth';
const router = Router();

router.post('/register',auth,registerAirport);
router.get('/getAll', auth,getAllAirports);
router.get('/get/:code', auth,getAirportByCode);
router.put('/update/:code', auth,updateAirportByCode);
router.delete('/delete/:code', auth,deleteAirportByCode);

export default router;
