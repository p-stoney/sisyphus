import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type GetAllOptions = {
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const getAll = async ({ ctx }: GetAllOptions) => {
  const { db, userId } = ctx;

  const distributors = await db.distributor.findMany({
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
