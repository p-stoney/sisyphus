import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type UpdateInvoiceDto } from "../validators";

type UpdateStatusOptions = {
  input: UpdateInvoiceDto;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Updates the status of an invoice.
 *
 * @param {Object} options - The options for updating the invoice status.
 * @param {UpdateInvoiceDto} options.input - The input data containing the invoice ID and new status.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<Object>} The updated invoice ID and new status.
 *
 * @throws {TRPCError} If the invoice is not found or the user does not have permission to update the invoice.
 */
export const updateStatus = async ({ input, ctx }: UpdateStatusOptions) => {
  const { invoiceId, newStatus } = input;

  const invoice = await ctx.db.invoice.findUnique({
    where: {
      id: invoiceId,
    },
  });

  if (!invoice) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invoice not found",
    });
  }

  if (invoice.businessId !== ctx.userId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to update this invoice",
    });
  }

  await ctx.db.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      status: newStatus,
    },
  });

  return {
    id: invoiceId,
    newStatus,
  };
};
