import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utilis/http-exception";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "No token provided");
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid token format");
  }

  const token = parts[1];

  if (!token) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid token format");
  }

  const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.userId = decoded.userId;
    req.organizationId = decoded.organizationId;
    next();
  } catch (err) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
}