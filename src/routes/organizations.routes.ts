import { Router } from 'express';
import { organizationController } from '../controllers/organization.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createOrganizationSchema, updateOrganizationSchema } from '../validators/organization.validator';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';

const router = Router();

router.get('/', validateRequest(paginationSchema), organizationController.getAll);
router.get('/:id', validateRequest(paramIdSchema), organizationController.getById);
router.post('/', validateRequest(createOrganizationSchema), organizationController.create);
router.put('/:id', validateRequest(updateOrganizationSchema), organizationController.update);
router.delete('/:id', validateRequest(paramIdSchema), organizationController.delete);

export default router;