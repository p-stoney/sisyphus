import { Prisma,  type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { type CreateDistributorDTO } from '../validators';

type CreateDistributorOptions = {
  input: CreateDistributorDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
}

export const createDistributor = async ({ input, ctx }: CreateDistributorOptions) => {
  try {
    const distributor = await ctx.db.distributor.create({
      data: {
        name: input.name,
        paymentTerms: input.paymentTerms,
      },
    });

    return {
      id: distributor.id,
      name: distributor.name,
      paymentTerms: distributor.paymentTerms,
    };

  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'A distributor with that name already exists',
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while creating the distributor',
    });
  }
};