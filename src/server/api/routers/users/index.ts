import { createTRPCRouter, adminProcedure } from "../../trpc";
import { CreateAssociationSchema, RemoveAssociationSchema, DeleteUserSchema } from "./validators";
import { createUserAssociation, removeUserAssociation, deleteUser } from "./procedures";

export const userRouter = createTRPCRouter({
  createUserAssociation: adminProcedure
    .input(CreateAssociationSchema)
    .mutation(async ({ input, ctx }) => createUserAssociation({ input, ctx })),

  removeUserAssociation: adminProcedure
    .input(RemoveAssociationSchema)
    .mutation(async ({ input, ctx }) => removeUserAssociation({ input, ctx })),

  deleteUser: adminProcedure
    .input(DeleteUserSchema)
    .mutation(async ({ input, ctx }) => deleteUser({ input, ctx })),
});