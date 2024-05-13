import { describe, expect, it } from "vitest";
import { Prisma, type InvoiceStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { createInvoice } from "../createInvoice";

describe("createInvoice procedure", () => {
  it("successfully creates a new invoice and checks key properties", async () => {
    const createInvoiceInput = {
      businessId: "biz123",
      distributorId: "dist123",
      items: [
        { name: "Product 1", price: "100", quantity: 2, productId: "prod1" },
        { name: "Product 2", price: "50", quantity: 1, productId: "prod2" },
      ],
      paymentTerms: 30,
      dateGenerated: new Date().toISOString(),
    };

    const mockInvoice = {
      id: "inv1",
      businessId: createInvoiceInput.businessId,
      distributorId: createInvoiceInput.distributorId,
      dueBy: new Date(createInvoiceInput.dateGenerated),
      status: "UNPAID" as InvoiceStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      items: createInvoiceInput.items.map((item) => ({
        ...item,
        id: `item-${Math.random()}`,
        name: item.name,
        price: new Prisma.Decimal(item.price),
        quantity: item.quantity,
        invoiceId: "inv1",
        productId: item.productId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })),
    };

    testdb.invoice.findUnique.mockResolvedValue(mockInvoice);

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.create.mockResolvedValue(mockInvoice);

    const result = await createInvoice({
      input: {
        ...createInvoiceInput,
        items: createInvoiceInput.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
      ctx,
    });

    expect(result).toHaveProperty("id", mockInvoice.id);
  });

  it("throws an error when the invoice cannot be created", async () => {
    const createInvoiceInput = {
      businessId: "biz123",
      distributorId: "dist123",
      items: [
        { name: "Product 1", price: "100", quantity: 2, productId: "prod1" },
        { name: "Product 2", price: "50", quantity: 1, productId: "prod2" },
      ],
      paymentTerms: 30,
      dateGenerated: new Date().toISOString(),
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("P2002", {
        code: "P2002",
        clientVersion: "1.0.0",
        meta: {},
        batchRequestIdx: 0,
      }),
    );

    await expect(
      createInvoice({
        input: {
          ...createInvoiceInput,
          items: createInvoiceInput.items.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
        },
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      createInvoice({
        input: {
          ...createInvoiceInput,
          items: createInvoiceInput.items.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
        },
        ctx,
      }),
    ).rejects.toHaveProperty("code", "INTERNAL_SERVER_ERROR");
  });
});
