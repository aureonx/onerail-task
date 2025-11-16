import { Router } from 'express';
import { organizationController } from '../controllers/organization.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createOrganizationSchema, updateOrganizationSchema } from '../validators/organization.validator';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request } from "express";
import { HttpException } from '../utilis/http-exception';
import { StatusCodes } from 'http-status-codes';

const router = Router();

const orgRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  keyGenerator: (req: Request) => {
    const organizationId = req.headers['x-organization-id'];

    if (typeof organizationId === 'string') {
      return organizationId;
    }

    return ipKeyGenerator(req.ip as string);
  },
  handler: (req, res) => {
    throw new HttpException(StatusCodes.TOO_MANY_REQUESTS, "Too many requests from your organization. Try again later.")
  }
});

router.use(orgRateLimiter);

router.get('/', validateRequest(paginationSchema), organizationController.getAll);
router.get('/:id', validateRequest(paramIdSchema), organizationController.getById);
router.post('/', validateRequest(createOrganizationSchema), organizationController.create);
router.put('/:id', validateRequest(updateOrganizationSchema), organizationController.update);
router.delete('/:id', validateRequest(paramIdSchema), organizationController.delete);

export default router;