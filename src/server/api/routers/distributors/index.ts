import { createTRPCRouter, privateProcedure, adminProcedure } from "../../trpc";
import {
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
  getAll: privateProcedure.query(async ({ ctx }) => getAll({ ctx })),

  getById: privateProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  list: privateProcedure
    .input(ListDistributorsSchema)
    .query(async ({ input, ctx }) => list({ input, ctx })),

  createDistributor: adminProcedure
    .input(CreateDistributorSchema)
    .mutation(async ({ input, ctx }) => createDistributor({ input, ctx })),

  deleteDistributor: adminProcedure
    .input(DeleteDistributorSchema)
    .mutation(async ({ input, ctx }) => deleteDistributor({ input, ctx })),
});
