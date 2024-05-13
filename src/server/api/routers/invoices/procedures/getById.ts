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
