import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type GetAllDTO } from "../validators";

type GetAllOptions = {
  input: GetAllDTO;
  ctx: Context;
};

export const getAll = async ({ input, ctx }: GetAllOptions) => {
  const { distributorId } = input;

  const products = await ctx.db.product.findMany({
    where: {
      distributorId: distributorId,
    },
  });

  if (!products.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No products found for this distributor.",
    });
  }

  return products;
};