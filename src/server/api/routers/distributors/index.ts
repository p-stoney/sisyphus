import { createTRPCRouter, privateProcedure, adminProcedure } from "../../trpc";
import {
  GetByIdSchema,
  CreateDistributorSchema,
  DeleteDistributorSchema,
} from "./validators";
import { getById, createDistributor, deleteDistributor } from "./procedures";

export const distributorRouter = createTRPCRouter({
  getById: privateProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  createDistributor: adminProcedure
    .input(CreateDistributorSchema)
    .mutation(async ({ input, ctx }) => createDistributor({ input, ctx })),

  deleteDistributor: adminProcedure
    .input(DeleteDistributorSchema)
    .mutation(async ({ input, ctx }) => deleteDistributor({ input, ctx })),
});
