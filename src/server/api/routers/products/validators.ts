import { z } from "zod";

export const GetAllSchema = z.object({
  distributorId: z.string(),
});

export type GetAllDTO = z.TypeOf<typeof GetAllSchema>;