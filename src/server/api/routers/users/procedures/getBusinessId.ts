import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetBusinessDTO } from "../validators";

type GetBusinessIdOptions = {
  input: GetBusinessDTO;
  ctx: Context;
};

/**
 * Retrieves the business ID associated with a user.
 *
 * @param {GetBusinessIdOptions} options - The options containing the input data and context.
 * @param {GetBusinessDTO} options.input - The input data for getting the business ID.
 * @param {Context} options.ctx - The context containing the Prisma client and user ID.
 *
 * @returns {Promise<string>} The business ID.
 *
 * @throws {TRPCError} If the user or business is not found.
 */
export const getBusinessId = async ({ input, ctx }: GetBusinessIdOptions) => {
  const { userId } = input;

  const user = await ctx.db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      businesses: true,
    },
  });

  const business = await ctx.db.business.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!user || !business) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No businesses found for user",
    });
  }

  return business.id;
};
