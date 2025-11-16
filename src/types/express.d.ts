import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      validatedParams: any;
      validatedQuery: any;
      validatedBody: any;
    }
  }
}