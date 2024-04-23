import { clerkClient } from "@clerk/nextjs/server";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { type DeleteDistributorDTO } from '../validators';

type DeleteDistributorOptions = {
  input: DeleteDistributorDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
}

export const deleteDistributor = async ({ input, ctx }: DeleteDistributorOptions) => {
  const { distributorId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const distributor = await transaction.distributor.findUnique({
      where: {
        id: distributorId,
      },
    });

    if (!distributor) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Distributor not found' });
    }

    await transaction.distributor.delete({
      where: { id: distributorId },
    });

    return {
      id: distributorId,
      deletedAt: distributor.deletedAt
    };
  });
};