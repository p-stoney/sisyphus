import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetAllSchema,
  GetByIdSchema,
  ListDistributorsSchema,
  CreateDistributorSchema,
  DeleteDistributorSchema,
} from "./validators";
import {
  getAll,
  getById,
  list,
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

  list: protectedProcedure
    .input(ListDistributorsSchema)
    .query(async ({ input, ctx }) => list({ input, ctx })),

  createDistributor: protectedProcedure
    .input(CreateDistributorSchema)
    .mutation(async ({ input, ctx }) => createDistributor({ input, ctx })),

  deleteDistributor: protectedProcedure
    .input(DeleteDistributorSchema)
    .mutation(async ({ input, ctx }) => deleteDistributor({ input, ctx })),
});
