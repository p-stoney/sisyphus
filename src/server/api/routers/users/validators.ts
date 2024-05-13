import { z } from "zod";

/**
 * Defines data transfer objects (DTOs) and validation schemas for user-related operations.
 * Ensures that input data adheres to expected formats and constraints.
 *
 * @module UserDTOs
 */
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

export const RemoveUserSchema = z.object({
  userId: z.string(),
});

export type GetBusinessDTO = z.TypeOf<typeof GetBusinessIdSchema>;
export type CreateUserDTO = z.TypeOf<typeof CreateAssociationSchema>;
export type RemoveAssociationDTO = z.TypeOf<typeof RemoveAssociationSchema>;
export type RemoveUserDTO = z.TypeOf<typeof RemoveUserSchema>;
