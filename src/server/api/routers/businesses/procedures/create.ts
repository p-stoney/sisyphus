import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type CreateBusinessDTO } from "../validators";

type CreateBusinessOptions = {
  input: CreateBusinessDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Creates a new business associated with the user.
 *
 * @param {Object} options - The options for creating the business.
 * @param {CreateBusinessDTO} options.input - The input data containing the business name.
 * @param {Object} options.ctx - The context object containing the database client and user ID.
 * @param {PrismaClient} options.ctx.db - The Prisma database client.
 * @param {string} options.ctx.userId - The ID of the user creating the business.
 *
 * @returns {Promise<Object>} The created business with its ID and name.
 *
 * @throws {TRPCError} If a business with the same name already exists or if there is an internal server error.
 */
export const create = async ({ input, ctx }: CreateBusinessOptions) => {
  try {
    const business = await ctx.db.business.create({
      data: {
        name: input.name,
        userId: ctx.userId || "",
      },
    });

    return {
      id: business.id,
      name: business.name,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A business with that name already exists",
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while creating the business",
    });
  }
};
