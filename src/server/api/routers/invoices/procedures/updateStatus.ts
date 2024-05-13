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
