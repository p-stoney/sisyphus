import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type GetByIdDTO } from "../validators";
import type { ExtendedInvoice } from "~/types";

type GetByIdOptions = {
  input: GetByIdDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Retrieves an invoice by its ID.
 *
 * @param {Object} options - The options for retrieving the invoice.
 * @param {GetByIdDTO} options.input - The input data for retrieving the invoice.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<ExtendedInvoice>} The retrieved invoice with its items and the total amount due.
 *
 * @throws {TRPCError} If the invoice is not found.
 */
export const getById = async ({ input, ctx }: GetByIdOptions) => {
  const { invoiceId } = input;

  const invoice = await ctx.db.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include: {
      items: true,
    },
  });

  if (!invoice) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invoice not found",
    });
  }

  const amountDue = invoice.items.reduce(
    (sum, item) => sum + item.price.toNumber() * item.quantity,
    0,
  );

  return {
    ...invoice,
    items: invoice.items,
    amountDue,
  } as ExtendedInvoice;
};
