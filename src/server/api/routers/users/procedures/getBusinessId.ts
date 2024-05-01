import { TRPCError } from "@trpc/server";
import { type PrismaClient } from "@prisma/client";

type GetBusinessIdOptions = {
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const getBusinessId = async ({ ctx }: GetBusinessIdOptions) => {
  const { db, userId } = ctx;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      businesses: true,
    },
  });

  const business = await db.business.findFirst({
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
