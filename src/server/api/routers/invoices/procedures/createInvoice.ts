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

export const createInvoice = async ({ input, ctx }: CreateInvoiceOptions) => {
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
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              productId: "",
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
