import { orderService } from '../order.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { orderRepository } from '../../repositories/order.repository';
import { organizationRepository } from '../../repositories/organization.repository';
import { userRepository } from '../../repositories/user.repository';


describe('OrderService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw when creating order with missing user', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    await expect(
      orderService.createOrder({ orderDate: '2020-01-01', totalAmount: 10, userId: 999, organizationId: 1 } as any)
    ).rejects.toThrow('User not found');
  });

  it('should throw when creating order with missing organization', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue({ id: 1 } as any);
    jest.spyOn(organizationRepository, 'findById').mockResolvedValue(null);

    await expect(
      orderService.createOrder({ orderDate: '2020-01-01', totalAmount: 10, userId: 1, organizationId: 999 } as any)
    ).rejects.toThrow('Organization not found');
  });

  it('should create order when user and organization exist', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue({ id: 1 } as any);
    jest.spyOn(organizationRepository, 'findById').mockResolvedValue({ id: 1 } as any);

    const created = { id: 1, orderDate: '2020-01-01', totalAmount: 100, userId: 1, organizationId: 1 } as any;
    jest.spyOn(orderRepository, 'create').mockResolvedValue(created);

    const result = await orderService.createOrder({ orderDate: '2020-01-01', totalAmount: 100, userId: 1, organizationId: 1 } as any);

    expect(result).toMatchObject({ id: 1, totalAmount: 100 });
  });
});
