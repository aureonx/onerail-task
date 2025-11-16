import { Request, RequestHandler } from 'express';
import z, { ZodObject, ZodTypeAny } from 'zod';

export interface ValidatedRequest<T extends ZodObject<any>>
  extends Request {
  validatedParams: z.infer<T>["params"];
  validatedQuery: z.infer<T>["query"];
  validatedBody: z.infer<T>["body"];
}

export type RequestSchema = ZodObject<{
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
}>;

export function validateRequest<T extends RequestSchema>(schema: T): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse({
      params: req.params,
      query: req.query,
      body: req.body
    });

    if (!result.success) {
      return res.status(400).json({ status: 400, error: z.treeifyError(result.error) });
    }

    req.validatedParams = result.data.params;
    req.validatedQuery = result.data.query;
    req.validatedBody = result.data.body;

    next();
  };
}



