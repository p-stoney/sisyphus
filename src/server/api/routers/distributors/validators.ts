import { z } from "zod";

export const GetByIdSchema = z.object({
  distributorId: z.string(),
});

export const CreateDistributorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  paymentTerms: z.number().min(0),
});

export const DeleteDistributorSchema = z.object({
  distributorId: z.string(),
});

export type GetByIdDTO = z.TypeOf<typeof GetByIdSchema>;
export type CreateDistributorDTO = z.TypeOf<typeof CreateDistributorSchema>;
export type DeleteDistributorDTO = z.TypeOf<typeof DeleteDistributorSchema>;
