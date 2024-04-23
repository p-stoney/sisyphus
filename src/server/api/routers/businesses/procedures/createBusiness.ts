import { clerkClient } from "@clerk/nextjs/server";
import { Prisma,  type PrismaClient } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { CreateBusinessDTO } from '../validators';

type CreateBusinessOptions = {
  input: CreateBusinessDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
}

export const createBusiness = async ({ input, ctx }: CreateBusinessOptions) => {
  try {
    const business = await ctx.db.business.create({
      data: {
        name: input.name,
        userId: ctx.userId || '',
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