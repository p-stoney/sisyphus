import { z } from "zod";

export const GetAllSchema = z.object({
  userId: z.string(),
});

export const GetByIdSchema = z.object({
  distributorId: z.string(),
});

export const CreateDistributorSchema = z.object({
  businessId: z.string(),
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

export type GetAllDTO = z.TypeOf<typeof GetAllSchema>;
export type GetByIdDTO = z.TypeOf<typeof GetByIdSchema>;
export type CreateDistributorDTO = z.TypeOf<typeof CreateDistributorSchema>;
export type DeleteDistributorDTO = z.TypeOf<typeof DeleteDistributorSchema>;
