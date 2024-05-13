import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetAllDTO } from "../validators";

type GetAllOptions = {
  input: GetAllDTO;
  ctx: Context;
};

export const getAll = async ({ input, ctx }: GetAllOptions) => {
  const { userId } = input;

  const distributors = await ctx.db.distributor.findMany({
    where: {
      businesses: {
        some: {
          business: {
            userId: userId,
          },
        },
      },
    },
    include: {
      invoices: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!distributors.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No distributors found for this user.",
    });
  }

  const enrichedDistributors = distributors.map((distributor) => {
    const allInvoicesPaid = distributor.invoices.every(
      (invoice) => invoice.status === "PAID",
    );
    return {
      ...distributor,
      allInvoicesPaid,
      totalUnpaidInvoicesAmount: distributor.invoices.reduce((acc, invoice) => {
        if (invoice.status === "UNPAID") {
          const total = invoice.items.reduce(
            (sum, item) => sum + item.price.toNumber() * item.quantity,
            0,
          );
          return acc + total;
        }
        return acc;
      }, 0),
    };
  });

  return enrichedDistributors;
};
