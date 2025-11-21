import { Router } from 'express';
import userRoutess from './users.routes';
import organizationsRoutes from './organizations.routes';
import ordersRoutes from './orders.routes';
import authRoutes from './auth.routes';
import { authMiddleware } from '../middleware/auth.middleware';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request } from "express";
import { HttpException } from '../utilis/http-exception';
import { StatusCodes } from 'http-status-codes';

const router = Router();

const orgRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  keyGenerator: (req: Request) => {
    const organizationId = req.organizationId;

    if (organizationId) {
      return String(organizationId);
    }

    return ipKeyGenerator(req.ip as string);
  },
  handler: (req, res) => {
    throw new HttpException(StatusCodes.TOO_MANY_REQUESTS, "Too many requests from your organization. Try again later.")
  }
});

router.use('/users', authMiddleware, orgRateLimiter, userRoutess);
router.use('/organizations', authMiddleware, orgRateLimiter, organizationsRoutes);
router.use('/orders', authMiddleware, orgRateLimiter, ordersRoutes);
router.use('/auth', authRoutes);

export default router;