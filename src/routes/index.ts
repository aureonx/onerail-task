import { Router } from 'express';
import userRoutess from './users.routes';
import organizationsRoutes from './organizations.routes';
import ordersRoutes from './orders.routes';
import authRoutes from './auth.routes';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use('/users', authMiddleware, userRoutess);
router.use('/organizations', authMiddleware, organizationsRoutes);
router.use('/orders', authMiddleware, ordersRoutes);
router.use('/auth', authRoutes);

export default router;