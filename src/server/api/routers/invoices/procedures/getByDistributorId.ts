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

/**
 * Retrieves invoices by distributor ID for a specific user.
 *
 * @param {Object} options - The options for retrieving the invoices.
 * @param {GetByDistributorIdDTO} options.input - The input data containing the distributor ID.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<Array<Object>>} A list of invoices with their items.
 *
 * @throws {TRPCError} If no invoices are found for the specified distributor and user.
 */
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
