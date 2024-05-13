import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type DeleteDistributorDTO } from "../validators";

type DeleteDistributorOptions = {
  input: DeleteDistributorDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Deletes a distributor by ID.
 *
 * @param {Object} options - The options for deleting the distributor.
 * @param {DeleteDistributorDTO} options.input - The input data containing the distributor ID.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<Object>} The ID and deletion date of the deleted distributor.
 *
 * @throws {TRPCError} If the distributor is not found.
 */
export const remove = async ({ input, ctx }: DeleteDistributorOptions) => {
  const { distributorId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const distributor = await transaction.distributor.findUnique({
      where: {
        id: distributorId,
      },
    });

    if (!distributor) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Distributor not found",
      });
    }

    await transaction.distributor.delete({
      where: { id: distributorId },
    });

    return {
      id: distributorId,
      deletedAt: distributor.deletedAt,
    };
  });
};
