import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetAllSchema,
  GetByIdSchema,
  CreateDistributorSchema,
  DeleteDistributorSchema,
} from "./validators";
import { getAll, getById, create, remove } from "./procedures";

/**
 * Creates the router for distributor-related endpoints.
 * Utilizes protectedProcedure to ensure these operations are only accessible when authenticated.
 * Each route validates input against predefined Zod schemas and delegates processing to specific procedures.
 *
 * @module DistributorRouter
 */
export const distributorRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetAllSchema)
    .query(async ({ input, ctx }) => getAll({ input, ctx })),

  getById: protectedProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  create: protectedProcedure
    .input(CreateDistributorSchema)
    .mutation(async ({ input, ctx }) => create({ input, ctx })),

  remove: protectedProcedure
    .input(DeleteDistributorSchema)
    .mutation(async ({ input, ctx }) => remove({ input, ctx })),
});
