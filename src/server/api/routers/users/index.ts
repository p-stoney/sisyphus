import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetBusinessIdSchema,
  CreateAssociationSchema,
  RemoveAssociationSchema,
  RemoveUserSchema,
} from "./validators";
import {
  getBusinessId,
  createUserAssociation,
  removeAssociation,
  remove,
} from "./procedures";

/**
 * Creates the router for user-related endpoints.
 * Utilizes protectedProcedure to ensure these operations are only accessible when authenticated.
 * Each route validates input against predefined Zod schemas and delegates processing to specific procedures.
 *
 * @module UserRouter
 */
export const userRouter = createTRPCRouter({
  getBusinessId: protectedProcedure
    .input(GetBusinessIdSchema)
    .query(async ({ input, ctx }) => getBusinessId({ input, ctx })),

  createUserAssociation: protectedProcedure
    .input(CreateAssociationSchema)
    .mutation(async ({ input, ctx }) => createUserAssociation({ input, ctx })),

  removeAssociation: protectedProcedure
    .input(RemoveAssociationSchema)
    .mutation(async ({ input, ctx }) => removeAssociation({ input, ctx })),

  remove: protectedProcedure
    .input(RemoveUserSchema)
    .mutation(async ({ input, ctx }) => remove({ input, ctx })),
});
