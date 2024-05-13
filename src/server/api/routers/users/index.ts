import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetBusinessIdSchema,
  CreateAssociationSchema,
  RemoveAssociationSchema,
  DeleteUserSchema,
} from "./validators";
import {
  getBusinessId,
  createUserAssociation,
  removeUserAssociation,
  deleteUser,
} from "./procedures";

export const userRouter = createTRPCRouter({
  getBusinessId: protectedProcedure
    .input(GetBusinessIdSchema)
    .query(async ({ input, ctx }) => getBusinessId({ input, ctx })),

  createUserAssociation: protectedProcedure
    .input(CreateAssociationSchema)
    .mutation(async ({ input, ctx }) => createUserAssociation({ input, ctx })),

  removeUserAssociation: protectedProcedure
    .input(RemoveAssociationSchema)
    .mutation(async ({ input, ctx }) => removeUserAssociation({ input, ctx })),

  deleteUser: protectedProcedure
    .input(DeleteUserSchema)
    .mutation(async ({ input, ctx }) => deleteUser({ input, ctx })),
});
