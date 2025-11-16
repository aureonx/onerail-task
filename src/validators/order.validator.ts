import { DateTime } from 'luxon';
import { z } from 'zod';

const pastDateValidator = z
  .string('Date is required')
  .refine((val) => {
    const dt = DateTime.fromISO(val);
    return dt.isValid;
  }, 'Invalid date format, expected iso')
  .refine((val) => {
    const dt = DateTime.fromISO(val);
    return dt < DateTime.now();
  }, 'Date must be in the past')
  .transform((val) => DateTime.fromISO(val).toJSDate());

export const createOrderSchema = z.object({
  body: z.object({
    totalAmount: z
      .number()
      .positive('totalAmount must be greater than 0'),
    userId: z.number().int().positive(),
    organizationId: z.number().int().positive(),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    totalAmount: z
      .number()
      .positive('totalAmount must be greater than 0').optional(),
    userId: z.number().int().positive().optional(),
    organizationId: z.number().int().positive().optional(),
  }),
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});