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

  const invoice = await ctx.db.invoice.findMany({
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
      message: "Invoices not found",
    });
  }

  const amountDue = invoice.reduce((acc, curr) => {
    const total = curr.items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return acc + total;
  }, 0);

  return {
    ...invoice,
    id: input.invoiceId,
    distributorId: invoice[1]?.distributorId,
    businessId: invoice[1]?.businessId,
    status: invoice[1]?.status,
    dueBy: invoice[1]?.dueBy,
    items: invoice[0],
    createdAt: invoice[1]?.createdAt,
    amountDue: amountDue,
  };
};
