import { z } from 'zod';

export const CreateBuinessSchema = z.object({
  name: z.string(),
});

export const DeleteBusinessSchema = z.object({
  businessId: z.string()
});

export type CreateBusinessDTO = z.TypeOf<typeof CreateBuinessSchema>;
export type DeleteBusinessDTO = z.TypeOf<typeof DeleteBusinessSchema>;