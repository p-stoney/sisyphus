import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetByIdDTO } from "../validators";

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

  return {
    ...distributor,
    id: distributor.id,
    name: distributor.name,
    email: distributor.email,
    address: distributor.address,
    city: distributor.city,
    state: distributor.state,
    postalCode: distributor.postalCode,
    paymentTerms: distributor.paymentTerms,
    invoices: distributor.invoices.map((invoice) => ({
      id: invoice.id,
      dueBy: invoice.dueBy,
      status: invoice.status,
      items: invoice.items,
      amountDue: invoice.items.reduce(
        (sum, item) => sum + item.price.toNumber() * item.quantity,
        0,
      ),
    })),
  };
};
