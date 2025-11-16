import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../middleware/validation.middleware';
import { userService } from '../services/user.service';
import { HttpException } from '../utilis/http-exception';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';


class UserController {
  async getAll(req: ValidatedRequest<typeof paginationSchema>, res: Response): Promise<void> {
    const { page, limit } = req.validatedQuery;

    const users = await userService.getPaginatedUsers(page, limit);

    res.status(StatusCodes.OK).json({
      data: users,
      page: req.validatedQuery.page,
      limit: req.validatedQuery.limit
    });
  }

  async getById(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;
    const user = await userService.getUserById(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    res.status(StatusCodes.OK).json(user);
  }

  async create(req: ValidatedRequest<typeof createUserSchema>, res: Response): Promise<void> {
    const newUser = await userService.createUser(req.validatedBody);

    res.status(StatusCodes.CREATED).json(newUser);
  }

  async update(req: ValidatedRequest<typeof updateUserSchema>, res: Response) {
    const id = req.validatedParams.id;

    const updatedUser = await userService.updateUser(id, req.validatedBody);

    if (!updatedUser) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    res.status(StatusCodes.OK).json(updatedUser);
  }

  async delete(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;

    await userService.deleteUser(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

export const userController = new UserController();