import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type CreateDistributorDTO } from "../validators";

type CreateDistributorOptions = {
  input: CreateDistributorDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

export const createDistributor = async ({
  input,
  ctx,
}: CreateDistributorOptions) => {
  const { db } = ctx;
  const { businessId, ...distributorData } = input;

  try {
    const distributor = await db.distributor.create({
      data: {
        ...distributorData,
        businesses: {
          create: {
            businessId,
          },
        },
      },
    });

    return distributor;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A distributor with that name already exists",
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while creating the distributor",
    });
  }
};
