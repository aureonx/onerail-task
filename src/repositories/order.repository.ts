import { Order, OrderCreationAttributes } from '../database/models/order.model';
import { Organization } from '../database/models/organization.model';
import { User } from '../database/models/user.model';

class OrderRepository {
  public async findAllPaginated(page: number, limit: number): Promise<Order[]> {
    const offset = (page - 1) * limit;
    return Order.findAll({
      limit: limit,
      offset,
      order: [['id', 'ASC']],
    });
  }

  public async findById(id: number): Promise<Order | null> {
    return Order.findByPk(id);
  }

  public async findByIdWithRelations(id: number): Promise<Order | null> {
    return Order.findByPk(id, { include: [User, Organization] });
  }

  public async create(data: OrderCreationAttributes): Promise<Order> {
    return Order.create(data);
  }

  public async update(id: number, data: Partial<OrderCreationAttributes>): Promise<[number, Order[]]> {
    return Order.update(data, {
      where: { id },
      returning: true,
    });
  }

  public async delete(id: number): Promise<number> {
    return Order.destroy({
      where: { id },
    });
  }
}

export const orderRepository = new OrderRepository();