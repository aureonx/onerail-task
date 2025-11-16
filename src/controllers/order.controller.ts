import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../middleware/validation.middleware';
import { HttpException } from '../utilis/http-exception';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';
import { orderService } from '../services/order.service';
import { createOrderSchema, updateOrderSchema } from '../validators/order.validator';

class OrderController {
  async getAll(req: ValidatedRequest<typeof paginationSchema>, res: Response): Promise<void> {
    const { page, limit } = req.validatedQuery;

    const orders = await orderService.getPaginatedOranizations(page, limit);

    res.status(StatusCodes.OK).json({
      data: orders,
      page: req.validatedQuery.page,
      limit: req.validatedQuery.limit
    });
  }

  async getById(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;
    const order = await orderService.getOrderById(id);

    if (!order) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Order not found");
    }

    res.status(StatusCodes.OK).json(order);
  }

  async create(req: ValidatedRequest<typeof createOrderSchema>, res: Response): Promise<void> {
    const newOrder = await orderService.createOrder(req.validatedBody);

    res.status(StatusCodes.CREATED).json(newOrder);
  }

  async update(req: ValidatedRequest<typeof updateOrderSchema>, res: Response) {
    const id = req.validatedParams.id;

    const updatedOrder = await orderService.updateOrder(id, req.validatedBody);

    if (!updatedOrder) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Order not found");
    }

    res.status(200).json(updatedOrder);
  }

  async delete(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;

    await orderService.deleteOrder(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

export const orderController = new OrderController();