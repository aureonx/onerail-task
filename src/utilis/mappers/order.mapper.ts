
import { Order } from '../../database/models/order.model';
import { OrderDto, OrderExtendedDto } from '../../dtos/order.dto';
import { mapToOrganizationDto } from './organization.mapper';
import { mapToUserDto } from './user.mapper';

export function mapToOrderDto(order: Order): OrderDto {
  return {
    id: order.id,
    orderDate: order.orderDate,
    totalAmount: order.totalAmount,
    userId: order.userId,
    organizationId: order.organizationId
  }
};

export function mapToOrderExtendedDto(order: Order): OrderExtendedDto {
  return {
    id: order.id,
    orderDate: order.orderDate,
    totalAmount: order.totalAmount,
    userId: order.userId,
    organizationId: order.organizationId,
    user: mapToUserDto(order.user),
    organization: mapToOrganizationDto(order.organization)
  };
}
