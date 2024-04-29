import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type ListDistributorsDTO } from "../validators";

type ListOptions = {
  input: ListDistributorsDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const list = async ({ input, ctx }: ListOptions) => {
  const { filterCriteria } = input;
  const { userId, db } = ctx;

  const distributors = await db.distributor.findMany({
    where: {
      businesses: {
        some: {
          business: {
            userId: userId,
          },
        },
      },
      ...(filterCriteria?.distributorName && {
        name: {
          contains: filterCriteria.distributorName,
          mode: "insensitive",
        },
      }),
      ...(typeof filterCriteria?.allInvoicesPaid === "boolean" && {
        invoices: {
          some: {
            status: filterCriteria.allInvoicesPaid ? "PAID" : "UNPAID",
          },
        },
      }),
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
      message: "No distributors found for this user with specified criteria.",
    });
  }

  return distributors.map((distributor) => ({
    ...distributor,
    invoices: distributor.invoices.map((invoice) => ({
      ...invoice,
      amountDue: invoice.items.reduce(
        (sum, item) => sum + item.price.toNumber() * item.quantity,
        0,
      ),
    })),
  }));
};
