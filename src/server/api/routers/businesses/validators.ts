import { z } from "zod";

export const CreateBuinessSchema = z.object({
  name: z.string(),
});

export const RemoveBusinessSchema = z.object({
  businessId: z.string(),
});

export type CreateBusinessDTO = z.TypeOf<typeof CreateBuinessSchema>;
export type RemoveBusinessDTO = z.TypeOf<typeof RemoveBusinessSchema>;
