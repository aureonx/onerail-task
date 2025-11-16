import { Router } from 'express';
import { validateRequest } from '../middleware/validation.middleware';
import { createOrderSchema, updateOrderSchema } from '../validators/order.validator';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';
import { orderController } from '../controllers/order.controller';

const router = Router();

router.get('/', validateRequest(paginationSchema), orderController.getAll);
router.get('/:id', validateRequest(paramIdSchema), orderController.getById);
router.post('/', validateRequest(createOrderSchema), orderController.create);
router.put('/:id', validateRequest(updateOrderSchema), orderController.update);
router.delete('/:id', validateRequest(paramIdSchema), orderController.delete);

export default router;