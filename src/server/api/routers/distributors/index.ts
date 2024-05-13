import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetAllSchema,
  GetByIdSchema,
  CreateDistributorSchema,
  DeleteDistributorSchema,
} from "./validators";
import {
  getAll,
  getById,
  createDistributor,
  deleteDistributor,
} from "./procedures";

export const distributorRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetAllSchema)
    .query(async ({ input, ctx }) => getAll({ input, ctx })),

  getById: protectedProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  createDistributor: protectedProcedure
    .input(CreateDistributorSchema)
    .mutation(async ({ input, ctx }) => createDistributor({ input, ctx })),

  deleteDistributor: protectedProcedure
    .input(DeleteDistributorSchema)
    .mutation(async ({ input, ctx }) => deleteDistributor({ input, ctx })),
});
