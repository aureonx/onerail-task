import { hash } from "bcrypt";
import { UserCreationAttributes } from '../database/models/user.model';
import { UserDto } from '../dtos/user.dto';
import { userRepository } from '../repositories/user.repository';
import { mapToUserDto } from '../utilis/mappers/user.mapper';
import { HttpException } from "../utilis/http-exception";
import { StatusCodes } from "http-status-codes";
import { Organization } from "../database/models/organization.model";
import { orderService } from "./order.service";

class UserService {
  public async getPaginatedUsers(page: number, limit: number): Promise<UserDto[]> {
    const users = await userRepository.findAllPaginated(page, limit);
    return users.map(mapToUserDto);
  }

  public async getUserById(id: number): Promise<UserDto | null> {
    const user = await userRepository.findById(id);
    return user ? mapToUserDto(user) : null;
  }

  public async createUser(userData: UserCreationAttributes): Promise<UserDto> {
    const organization = await Organization.findByPk(userData.organizationId);

    if (!organization) {
      throw new HttpException(StatusCodes.BAD_REQUEST, `Organization with id ${userData.organizationId} does not exist`);
    }

    const password = await hash(userData.password, 12);

    const newUser = await userRepository.create({
      ...userData,
      password
    });

    return mapToUserDto(newUser);
  }

  public async updateUser(id: number, userData: Partial<UserCreationAttributes>): Promise<UserDto | null> {
    if (userData.organizationId !== undefined) {
      const organization = await Organization.findByPk(userData.organizationId);

      if (!organization) {
        throw new HttpException(StatusCodes.BAD_REQUEST, `Organization with id ${userData.organizationId} does not exist`);
      }
    }


    if (userData.password) {
      userData.password = await hash(userData.password, 12);
    }

    const [affectedCount] = await userRepository.update(id, userData);

    if (affectedCount === 0) {
      return null;
    }

    return this.getUserById(id);
  }

  public async deleteUser(id: number): Promise<void> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    const hasOrder = await orderService.userHasOrder(id);

    // Based on domain model
    // > The `userId` and `organizationId` values must reference valid records.
    if (hasOrder) {
      // or soft delete
      throw new HttpException(StatusCodes.BAD_REQUEST, "Can't remove user with orders!");
    }

    await user.destroy();
  }
}

export const userService = new UserService();