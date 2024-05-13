import { z } from "zod";

export const GetBusinessIdSchema = z.object({
  userId: z.string(),
});

export const CreateAssociationSchema = z.object({
  userId: z.string(),
  businessIds: z.array(z.string()),
});

export const RemoveAssociationSchema = z.object({
  userId: z.string(),
  businessId: z.string(),
});

export const DeleteUserSchema = z.object({
  userId: z.string(),
});

export type GetBusinessDTO = z.TypeOf<typeof GetBusinessIdSchema>;
export type CreateUserDTO = z.TypeOf<typeof CreateAssociationSchema>;
export type RemoveAssociationDTO = z.TypeOf<typeof RemoveAssociationSchema>;
export type DeleteUserDTO = z.TypeOf<typeof DeleteUserSchema>;
