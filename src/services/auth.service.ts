import { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";
import { HttpException } from "../utilis/http-exception";

class AuthService {
  public async login(email: string, password: string): Promise<string> {
    const findUser = await userRepository.findByEmail(email);

    if (!findUser) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const isPasswordValid = await compare(password, findUser.password);

    if (!isPasswordValid) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";
    const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || "900");

    const payload = { userId: findUser.id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return token;
  }

}

export const authService = new AuthService();