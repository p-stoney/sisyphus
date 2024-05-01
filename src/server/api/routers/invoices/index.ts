import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetByIdSchema,
  GetByDistributorIdSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
} from "./validators";
import {
  getAll,
  getById,
  getByDistributorId,
  createInvoice,
  updateStatus,
} from "./procedures";

export const invoiceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => getAll({ ctx })),

  getById: protectedProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  getByDistributorId: protectedProcedure
    .input(GetByDistributorIdSchema)
    .query(async ({ input, ctx }) => getByDistributorId({ input, ctx })),

  createInvoice: protectedProcedure
    .input(CreateInvoiceSchema)
    .mutation(async ({ input, ctx }) => createInvoice({ input, ctx })),

  updateStatus: protectedProcedure
    .input(UpdateInvoiceSchema)
    .mutation(async ({ input, ctx }) => updateStatus({ input, ctx })),
});
