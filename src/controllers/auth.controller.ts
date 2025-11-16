import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../middleware/validation.middleware';
import { orderService } from '../services/order.service';
import { loginSchema } from '../validators/login.validator';
import { authService } from '../services/auth.service';

class AuthController {
  async login(req: ValidatedRequest<typeof loginSchema>, res: Response): Promise<void> {
    const token = await authService.login(req.validatedBody.email, req.validatedBody.password);

    res.status(StatusCodes.OK).json({ token });
  }

}

export const authController = new AuthController();