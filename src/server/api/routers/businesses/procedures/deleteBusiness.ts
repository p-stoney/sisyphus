import { type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { type DeleteBusinessDTO } from '../validators';

type DeleteBusinessOptions = {
  input: DeleteBusinessDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
}

export const deleteBusiness = async ({ input, ctx }: DeleteBusinessOptions) => {
  const { businessId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const business = await transaction.business.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Business not found' });
    }

    await transaction.business.delete({
      where: { id: businessId },
    });

    return {
      id: businessId,
      deletedAt: business.deletedAt
    };
  });
};