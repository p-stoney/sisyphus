import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetByIdDTO } from "../validators";
import type { ExtendedDistributor, ExtendedInvoice } from "~/types";

type GetByIdOptions = {
  input: GetByIdDTO;
  ctx: Context;
};

export const getById = async ({ input, ctx }: GetByIdOptions) => {
  const { distributorId } = input;

  const distributor = await ctx.db.distributor.findUnique({
    where: {
      id: distributorId,
    },
    include: {
      invoices: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!distributor) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Distributor not found",
    });
  }

  const extendedInvoices = distributor.invoices.map((invoice) => ({
    ...invoice,
    invoiceItems: invoice.items,
    amountDue: invoice.items.reduce(
      (sum, item) => sum + item.price.toNumber() * item.quantity,
      0,
    ),
  })) as ExtendedInvoice[];

  return {
    ...distributor,
    invoices: extendedInvoices,
  } as ExtendedDistributor;
};
