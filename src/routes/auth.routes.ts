import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { loginSchema } from '../validators/login.validator';

const router = Router();

router.post('/login', validateRequest(loginSchema), authController.login);

export default router;