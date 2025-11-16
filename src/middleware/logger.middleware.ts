import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.debug(`${req.method} ${req.originalUrl} - Headers: ${JSON.stringify(req.headers)}`);
  next();
}