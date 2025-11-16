import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';

const router = Router();

router.get('/', validateRequest(paginationSchema), userController.getAll);
router.get('/:id', validateRequest(paramIdSchema), userController.getById);
router.post('/', validateRequest(createUserSchema), userController.create);
router.put('/:id', validateRequest(updateUserSchema), userController.update);
router.delete('/:id', validateRequest(paramIdSchema), userController.delete);

export default router;