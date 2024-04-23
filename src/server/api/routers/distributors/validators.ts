import { z } from 'zod';

export const CreateDistributorSchema = z.object({
  name: z.string(),
  paymentTerms: z.number().min(0),
});

export const DeleteDistributorSchema = z.object({
  distributorId: z.string()
});

export type CreateDistributorDTO = z.TypeOf<typeof CreateDistributorSchema>;
export type DeleteDistributorDTO = z.TypeOf<typeof DeleteDistributorSchema>;