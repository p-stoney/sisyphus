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

  const invoices = await db.invoice.findMany({
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
