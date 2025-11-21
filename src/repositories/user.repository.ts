import { User, UserCreationAttributes } from '../database/models/user.model';

class UserRepository {
  public async findAllPaginated(page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit;
    return User.findAll({
      limit: limit,
      offset,
      order: [['id', 'ASC']],
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  public async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  public async findAllById(id: number[]): Promise<User[] | null> {
    return User.findAll({ where: { id } });
  }


  public async create(userData: UserCreationAttributes): Promise<User> {
    return User.create(userData);
  }

  public async update(id: number, userData: Partial<UserCreationAttributes>): Promise<[number, User[]]> {
    return User.update(userData, {
      where: { id },
      returning: true,
    });
  }

  public async delete(id: number): Promise<number> {
    return User.destroy({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository();