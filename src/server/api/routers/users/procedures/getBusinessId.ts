import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetBusinessDTO } from "../validators";

type GetBusinessIdOptions = {
  input: GetBusinessDTO;
  ctx: Context;
};

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
