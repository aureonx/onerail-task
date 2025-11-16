import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    password: z.string().min(6, "password must have at least 6 characters").max(250),
    firstName: z
      .string('firstName is required')
      .trim()
      .min(1, 'firstName cannot be empty or whitespace'),
    lastName: z
      .string('lastName is required')
      .trim()
      .min(1, 'lastName cannot be empty or whitespace'),
    email: z.email('Invalid email format'),
    organizationId: z.int().positive()
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    password: z.string().min(6, "password must have at least 6 characters").max(250).optional(),
    firstName: z.string().trim().min(1, 'firstName cannot be empty or whitespace').optional(),
    lastName: z.string().trim().min(1, 'lastName cannot be empty or whitespace').optional(),
    email: z.email('Invalid email format').optional(),
    organizationId: z.int().positive().optional(),
  }),
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});