import { createTRPCRouter, privateProcedure } from "../../trpc";
import {
  GetByIdSchema,
  GetByDistributorIdSchema,
  UpdateInvoiceSchema,
} from "./validators";
import { getById, getByDistributorId, updateStatus } from "./procedures";

export const invoiceRouter = createTRPCRouter({
  getById: privateProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  getByDistributorId: privateProcedure
    .input(GetByDistributorIdSchema)
    .query(async ({ input, ctx }) => getByDistributorId({ input, ctx })),

  updateStatus: privateProcedure
    .input(UpdateInvoiceSchema)
    .mutation(async ({ input, ctx }) => updateStatus({ input, ctx })),
});
