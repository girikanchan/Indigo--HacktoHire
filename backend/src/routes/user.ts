import { Router } from 'express';
import { register, login, updateUser } from '../controller/user.controller';
import {auth} from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:userId', auth, updateUser);

export default router;
