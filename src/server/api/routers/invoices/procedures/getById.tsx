import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type GetByIdDTO } from "../validators";

type GetByIdOptions = {
  input: GetByIdDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const getById = async ({ input, ctx }: GetByIdOptions) => {
  const { invoiceId } = input;

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

  const invoiceItems = await ctx.db.invoice.findMany({
    where: {
      id: invoiceId,
    },
    include: {
      items: true,
    },
  });

  if (!invoiceItems) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invoices not found",
    });
  }

  const amountDue = invoiceItems.reduce((acc, curr) => {
    const total = curr.items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return acc + total;
  }, 0);

  return {
    invoice,
    invoiceItems,
    amountDue,
  };
};
