import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type CreateInvoiceDTO } from "../validators";

type CreateInvoiceOptions = {
  input: CreateInvoiceDTO;
  ctx: {
    db: PrismaClient;
    userId: string;
  };
};

/**
 * Creates a new invoice in the database.
 *
 * @param {Object} options - The options for creating the invoice.
 * @param {CreateInvoiceDTO} options.input - The input data for creating the invoice.
 * @param {PrismaClient} options.ctx.db - The Prisma client instance.
 * @param {string} options.ctx.userId - The ID of the current user.
 *
 * @returns {Promise<Object>} The created invoice.
 *
 * @throws {TRPCError} If there is an error creating the invoice, such as a unique constraint violation.
 */
export const create = async ({ input, ctx }: CreateInvoiceOptions) => {
  const { db } = ctx;
  const { businessId, distributorId, items, paymentTerms, dateGenerated } =
    input;

  try {
    const dueBy = new Date(dateGenerated);
    dueBy.setDate(dueBy.getDate() + paymentTerms);

    const invoice = await db.invoice.create({
      data: {
        businessId,
        distributorId,
        dueBy,
        status: "UNPAID",
        items: {
          createMany: {
            data: items.map((item) => ({
              productId: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      },
    });

    return invoice;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create the invoice.",
      });
    }
  }
};
