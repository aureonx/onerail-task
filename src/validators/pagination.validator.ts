import z from "zod";

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive(),
    limit: z.coerce.number().int().positive()
  })
});