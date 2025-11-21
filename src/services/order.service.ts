import { StatusCodes } from "http-status-codes";
import { OrderCreationAttributes } from "../database/models/order.model";
import { OrderDto } from "../dtos/order.dto";
import { orderRepository } from "../repositories/order.repository";
import { organizationRepository } from "../repositories/organization.repository";
import { userRepository } from "../repositories/user.repository";
import { HttpException } from "../utilis/http-exception";
import { mapToOrderDto, mapToOrderExtendedDto } from "../utilis/mappers/order.mapper";

class OrderService {
  public async userHasOrder(userId: number): Promise<boolean> {
    return !!await orderRepository.findOneByUserId(userId);
  }

  public async getPaginatedOranizations(page: number, limit: number): Promise<OrderDto[]> {
    const orders = await orderRepository.findAllPaginated(page, limit);
    return orders.map(mapToOrderDto);
  }

  public async getOrderById(id: number): Promise<OrderDto | null> {
    const order = await orderRepository.findByIdWithRelations(id);

    return order ? mapToOrderExtendedDto(order) : null;
  }


  public async createBulkOrder(data: OrderCreationAttributes[]): Promise<any> {
    const order = data.find((value) => value.organizationId);

    if (!order) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "No orders provided");
    }

    const organizationId = order.organizationId;

    const isDifferent = data.some((value) => value.organizationId !== organizationId);

    if (isDifferent) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "All orders must belong to the same organization");
    }

    const organizationExist = await organizationRepository.findById(organizationId);

    if (!organizationExist) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
    }

    const usersId: number[] = []

    for (const order of data) {
      if (!usersId.includes(order.userId)) {
        usersId.push(order.userId);
      }
    }

    const users = await userRepository.findAllById(usersId);

    if (!users || users.length === 0 || users.length !== usersId.length) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Users not found");
    }

    const validUser = users.every((user) => user.organizationId === organizationId);

    if (!validUser) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Users do not belong to the organization");
    }

    let ordersTotalAmount = 0;

    data.forEach((order) => ordersTotalAmount += order.totalAmount);

    const orderAmountLimit = 10000;

    if (ordersTotalAmount > orderAmountLimit) {
      throw new HttpException(StatusCodes.BAD_REQUEST, `Total amount of all orders exceeds the limit of ${orderAmountLimit}`);
    }

    const newOrder = await orderRepository.bulkCreate(data);

    return newOrder.map((value) => mapToOrderDto(value));
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