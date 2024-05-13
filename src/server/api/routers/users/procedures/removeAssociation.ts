import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type RemoveAssociationDTO } from "../validators";

type RemoveAssociationOptions = {
  input: RemoveAssociationDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Removes an association between a user and a business.
 *
 * @param {Object} options - The options for removing the association.
 * @param {RemoveAssociationDTO} options.input - The input data for removing the association.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<{id: string, businesses: Array<{id: string, name: string}>, updatedAt: Date}>} The updated user with remaining associated businesses.
 *
 * @throws {TRPCError} If the user or business is not found, or if an internal server error occurs.
 */
export const removeAssociation = async ({
  input,
  ctx,
}: RemoveAssociationOptions) => {
  const { userId, businessId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const user = await transaction.user.findUnique({
      where: {
        id: userId,
      },
      include: { businesses: true },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const currentBusinesses = user.businesses.map((business) => business.id);

    const invalidBusiness = !currentBusinesses.includes(businessId);

    if (invalidBusiness) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Business selected for removal not found",
      });
    }

    await transaction.user.update({
      where: { id: userId },
      data: {
        businesses: {
          disconnect: { id: businessId },
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
