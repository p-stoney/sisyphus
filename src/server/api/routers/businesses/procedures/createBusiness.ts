import { Prisma,  type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';
import { CreateBusinessDTO } from '../validators';

type CreateBusinessOptions = {
  input: CreateBusinessDTO;
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
}

export const createBusiness = async ({ input, ctx }: CreateBusinessOptions) => {
  try {
    const business = await ctx.db.business.create({
      data: {
        name: input.name,
        userId: ctx.session?.user.id || '',
      },
    });

    return {
      id: business.id,
      name: business.name,
    };

  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'A business with that name already exists',
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while creating the business',
    });
  }
};