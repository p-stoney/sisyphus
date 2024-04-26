import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type GetByIdDTO } from "../validators";

// TODO: Determine return type of procedures

type GetByIdOptions = {
  input: GetByIdDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const getById = async ({ input, ctx }: GetByIdOptions) => {
  const { distributorId } = input;

  const distributor = await ctx.db.distributor.findUnique({
    where: {
      id: distributorId,
    },
    include: {
      invoices: true,
    },
  });

  if (!distributor) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Distributor not found",
    });
  }

  return {
    id: distributor.id,
    name: distributor.name,
    email: distributor.email,
    address: distributor.address,
    city: distributor.city,
    state: distributor.state,
    postalCode: distributor.postalCode,
    paymentTerms: distributor.paymentTerms,
    invoices: distributor.invoices,
  };
};
