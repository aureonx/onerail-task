import { DateTime } from 'luxon';
import { z } from 'zod';

const pastDateValidator = z
  .string('Date is required')
  .refine((val) => {
    const dt = DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' });
    return dt.isValid;
  }, 'Invalid date format, expected yyyy-MM-dd')
  .refine((val) => {
    const dt = DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' });
    return dt < DateTime.now();
  }, 'Date must be in the past');

export const createOrganizationSchema = z.object({
  body: z.object({
    name: z
      .string('name is required')
      .trim()
      .min(1, 'name cannot be empty or whitespace'),
    industry: z
      .string('industry is required')
      .trim()
      .min(1, 'industry cannot be empty or whitespace'),
    dateFounded: pastDateValidator
  }),
});

export const updateOrganizationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'name cannot be empty or whitespace').optional(),
    industry: z
      .string()
      .trim()
      .min(1, 'industry cannot be empty or whitespace').optional(),
    dateFounded: pastDateValidator.optional()
  }),
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});