import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type RemoveBusinessDTO } from "../validators";

type DeleteBusinessOptions = {
  input: RemoveBusinessDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Deletes a business by its ID.
 *
 * @param {Object} options - The options for deleting the business.
 * @param {RemoveBusinessDTO} options.input - The input data containing the business ID.
 * @param {Object} options.ctx - The context object containing the database client and user ID.
 * @param {PrismaClient} options.ctx.db - The Prisma database client.
 * @param {string} options.ctx.userId - The ID of the user requesting the deletion.
 *
 * @returns {Promise<Object>} The deleted business with its ID and deletion timestamp.
 *
 * @throws {TRPCError} If the business is not found or if there is an internal server error.
 */
export const remove = async ({ input, ctx }: DeleteBusinessOptions) => {
  const { businessId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const business = await transaction.business.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Business not found" });
    }

    await transaction.business.delete({
      where: { id: businessId },
    });

    return {
      id: businessId,
      deletedAt: business.deletedAt,
    };
  });
};
