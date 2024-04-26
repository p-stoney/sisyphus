import { createTRPCRouter, privateProcedure } from "../../trpc";
import { GetByIdSchema, GetByDistributorIdSchema } from "./validators";
import { getById, getByDistributorId } from "./procedures";

export const invoiceRouter = createTRPCRouter({
  getById: privateProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  getByDistributorId: privateProcedure
    .input(GetByDistributorIdSchema)
    .query(async ({ input, ctx }) => getByDistributorId({ input, ctx })),
});
