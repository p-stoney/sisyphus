import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type RemoveUserDTO } from "../validators";

type DeleteUserOptions = {
  input: RemoveUserDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Removes a user from the database.
 *
 * @param {Object} options - The options for removing the user.
 * @param {RemoveUserDTO} options.input - The input data for removing the user.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<{id: string, deletedAt: Date}>} The ID of the removed user and the deletion timestamp.
 *
 * @throws {TRPCError} If the user is not found.
 */
export const remove = async ({ input, ctx }: DeleteUserOptions) => {
  const { userId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const user = await transaction.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    await transaction.user.delete({
      where: { id: userId },
    });

    return {
      id: userId,
      deletedAt: user.deletedAt,
    };
  });
};
