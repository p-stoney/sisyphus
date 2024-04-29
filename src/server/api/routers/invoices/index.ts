import { adminProcedure, createTRPCRouter, privateProcedure } from "../../trpc";
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
  getAll: privateProcedure.query(async ({ ctx }) => getAll({ ctx })),

  getById: privateProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  getByDistributorId: privateProcedure
    .input(GetByDistributorIdSchema)
    .query(async ({ input, ctx }) => getByDistributorId({ input, ctx })),

  createInvoice: adminProcedure
    .input(CreateInvoiceSchema)
    .mutation(async ({ input, ctx }) => createInvoice({ input, ctx })),

  updateStatus: privateProcedure
    .input(UpdateInvoiceSchema)
    .mutation(async ({ input, ctx }) => updateStatus({ input, ctx })),
});
