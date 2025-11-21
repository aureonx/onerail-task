import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      organizationId?: number;
      validatedParams: any;
      validatedQuery: any;
      validatedBody: any;
    }
  }
}