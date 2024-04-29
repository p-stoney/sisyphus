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

  if (!user || !user.businesses || !user.businesses.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No businesses found for user",
    });
  }

  return user.businesses[0]!.id;
};
