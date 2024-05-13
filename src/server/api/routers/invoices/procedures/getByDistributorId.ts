import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type GetByDistributorIdDTO } from "../validators";

type GetByDistributorIdOptions = {
  input: GetByDistributorIdDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const getByDistributorId = async ({
  input,
  ctx,
}: GetByDistributorIdOptions) => {
  const { distributorId } = input;
  const { userId, db } = ctx;

  const invoices = await db.invoice.findMany({
    where: {
      distributorId,
      business: {
        user: {
          id: userId,
        },
      },
    },
    include: {
      items: true,
    },
  });

  if (!invoices.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No invoices found for this distributor and user",
    });
  }

  return invoices.map((invoice) => ({
    id: invoice.id,
    dueBy: invoice.dueBy,
    status: invoice.status,
    items: invoice.items,
  }));
};
