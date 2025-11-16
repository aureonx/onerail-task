import { StatusCodes } from "http-status-codes";
import { OrderCreationAttributes } from "../database/models/order.model";
import { HttpException } from "../utilis/http-exception";
import { orderRepository } from "../repositories/order.repository";
import { OrderDto } from "../dtos/order.dto";
import { mapToOrderDto, mapToOrderExtendedDto } from "../utilis/mappers/order.mapper";
import { userRepository } from "../repositories/user.repository";
import da from "zod/v4/locales/da.js";
import { organizationRepository } from "../repositories/organization.repository";

class OrderService {
  public async getPaginatedOranizations(page: number, limit: number): Promise<OrderDto[]> {
    const orders = await orderRepository.findAllPaginated(page, limit);
    return orders.map(mapToOrderDto);
  }

  public async getOrderById(id: number): Promise<OrderDto | null> {
    const order = await orderRepository.findByIdWithRelations(id);

    return order ? mapToOrderExtendedDto(order) : null;
  }

  public async createOrder(data: OrderCreationAttributes): Promise<OrderDto> {
    const userExist = await userRepository.findById(data.userId);

    if (!userExist) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    const organizationExist = await organizationRepository.findById(data.organizationId);

    if (!organizationExist) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
    }

    const newOrder = await orderRepository.create(data);

    return mapToOrderDto(newOrder);
  }

  public async updateOrder(id: number, data: Partial<OrderCreationAttributes>): Promise<OrderDto | null> {
    if (data.userId !== undefined) {
      const userExist = await userRepository.findById(data.userId);

      if (!userExist) {
        throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
      }
    }

    if (data.organizationId !== undefined) {
      const organizationExist = await organizationRepository.findById(data.organizationId);

      if (!organizationExist) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
      }
    }

    const [affectedCount] = await orderRepository.update(id, data);

    if (affectedCount === 0) {
      return null;
    }

    return this.getOrderById(id);
  }

  public async deleteOrder(id: number): Promise<void> {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Order not found");
    }

    await order.destroy();
  }
}

export const orderService = new OrderService();