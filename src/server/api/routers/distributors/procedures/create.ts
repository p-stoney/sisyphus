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

/**
 * Creates a new distributor and associates it with a business.
 *
 * @param {Object} options - The options for creating the distributor.
 * @param {CreateDistributorDTO} options.input - The input data for the new distributor.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<Object>} The created distributor.
 *
 * @throws {TRPCError} If a distributor with the same name already exists or if an error occurs during creation.
 */
export const create = async ({ input, ctx }: CreateDistributorOptions) => {
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
