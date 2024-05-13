import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetAllDTO } from "../validators";

type GetAllOptions = {
  input: GetAllDTO;
  ctx: Context;
};

export const getAll = async ({ input, ctx }: GetAllOptions) => {
  const { userId } = input;

  const invoices = await ctx.db.invoice.findMany({
    where: {
      business: {
        userId,
      },
    },
    include: {
      distributor: true,
      items: true,
    },
  });

  if (!invoices.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No invoices found for this user.",
    });
  }

  const enrichedInvoices = invoices.map((invoice) => {
    const totalDue = invoice.items.reduce((sum, item) => {
      return sum + item.price.toNumber() * item.quantity;
    }, 0);

    return {
      ...invoice,
      totalDue,
      isPaid: invoice.status === "PAID",
    };
  });

  return enrichedInvoices;
};
