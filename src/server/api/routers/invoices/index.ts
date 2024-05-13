import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  GetAllSchema,
  GetByIdSchema,
  GetByDistributorIdSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
} from "./validators";
import {
  getAll,
  getById,
  getByDistributorId,
  create,
  updateStatus,
} from "./procedures";

/**
 * Creates the router for invoice-related endpoints.
 * Utilizes protectedProcedure to ensure these operations are only accessible when authenticated.
 * Each route validates input against predefined Zod schemas and delegates processing to specific procedures.
 *
 * @module InvoiceRouter
 */
export const invoiceRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetAllSchema)
    .query(async ({ input, ctx }) => getAll({ input, ctx })),

  getById: protectedProcedure
    .input(GetByIdSchema)
    .query(async ({ input, ctx }) => getById({ input, ctx })),

  getByDistributorId: protectedProcedure
    .input(GetByDistributorIdSchema)
    .query(async ({ input, ctx }) => getByDistributorId({ input, ctx })),

  create: protectedProcedure
    .input(CreateInvoiceSchema)
    .mutation(async ({ input, ctx }) => create({ input, ctx })),

  updateStatus: protectedProcedure
    .input(UpdateInvoiceSchema)
    .mutation(async ({ input, ctx }) => updateStatus({ input, ctx })),
});
