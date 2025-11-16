import { Organization, OrganizationCreationAttributes } from '../database/models/organization.model';
import { User } from '../database/models/user.model';

class OrganizationRepository {
  public async findAllPaginated(page: number, limit: number): Promise<Organization[]> {
    const offset = (page - 1) * limit;
    return Organization.findAll({
      limit: limit,
      offset,
      order: [['id', 'ASC']],
    });
  }

  public async findById(id: number): Promise<Organization | null> {
    return Organization.findByPk(id);
  }

  public async findByIdWithUsers(id: number): Promise<Organization | null> {
    return Organization.findByPk(id, { include: [User] });
  }


  public async create(data: OrganizationCreationAttributes): Promise<Organization> {
    return Organization.create(data);
  }

  public async update(id: number, data: Partial<OrganizationCreationAttributes>): Promise<[number, Organization[]]> {
    return Organization.update(data, {
      where: { id },
      returning: true,
    });
  }

  public async delete(id: number): Promise<number> {
    return Organization.destroy({
      where: { id },
    });
  }
}

export const organizationRepository = new OrganizationRepository();