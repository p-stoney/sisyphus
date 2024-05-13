import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type CreateUserDTO } from "../validators";

type CreateAssociationOptions = {
  input: CreateUserDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Creates an association between a user and multiple businesses.
 *
 * @param {CreateAssociationOptions} options - The options containing the input data and context.
 * @param {CreateUserDTO} options.input - The input data for creating the user association.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<{id: string, businesses: Array<{id: string, name: string}>, updatedAt: Date}>} The updated user with associated businesses.
 *
 * @throws {TRPCError} If the user or businesses are not found, or if an internal server error occurs.
 */
export const createUserAssociation = async ({
  input,
  ctx,
}: CreateAssociationOptions) => {
  const { userId, businessIds } = input;

  return ctx.db.$transaction(async (transaction) => {
    const user = await transaction.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const businesses = await transaction.business.findMany({
      where: {
        id: { in: businessIds },
      },
    });

    if (!businesses) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "One or more businesses not found",
      });
    }

    await transaction.user.update({
      where: { id: userId },
      data: {
        businesses: {
          connect: businessIds.map((id) => ({ id })),
        },
      },
    });

    const updatedUser = await transaction.user.findUnique({
      where: { id: userId },
      include: { businesses: true },
    });

    if (!updatedUser) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return {
      id: updatedUser.id,
      businesses: updatedUser.businesses.map((business) => ({
        id: business.id,
        name: business.name,
      })),
      updatedAt: updatedUser.updatedAt,
    };
  });
};
