import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.email('Invalid email format'),
  }),
});
