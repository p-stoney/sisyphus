import { type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';
import { type DeleteUserDTO } from '../validators';

type DeleteUserOptions = {
  input: DeleteUserDTO;
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
}

export const deleteUser = async ({ input, ctx }: DeleteUserOptions) => {
  const { userId } = input;

  return ctx.db.$transaction(async (transaction) => {
    const user = await transaction.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    await transaction.user.delete({
      where: { id: userId },
    });

    return {
      id: userId,
      deletedAt: user.deletedAt
    };
  });
};