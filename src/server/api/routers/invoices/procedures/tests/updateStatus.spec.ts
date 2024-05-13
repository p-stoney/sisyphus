import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { Prisma, type InvoiceStatus } from "@prisma/client";
import { testdb, createContextInner } from "~/tests/testSetup";
import { updateStatus } from "../updateStatus";

describe("updateStatus invoice procedure", () => {
  it("successfully updates an invoice status", async () => {
    const mockUser = {
      id: "biz123",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const updateStatusInput = {
      invoiceId: "inv1",
      newStatus: "PAID" as InvoiceStatus,
    };

    const mockInvoice = {
      id: "inv1",
      businessId: "biz123",
      distributorId: "dist123",
      dueBy: new Date(),
      status: "UNPAID" as InvoiceStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      items: [
        {
          id: "item1",
          name: "Product A",
          price: new Prisma.Decimal("100.00"),
          quantity: 2,
          invoiceId: "inv1",
          productId: "prod123",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
    };

    const ctx = createContextInner({ userId: mockUser.id });

    testdb.invoice.findUnique.mockResolvedValue(mockInvoice);
    testdb.invoice.update.mockResolvedValue({
      ...mockInvoice,
      status: updateStatusInput.newStatus,
    });

    const result = await updateStatus({
      input: updateStatusInput,
      ctx,
    });

    expect(result).toEqual({
      id: "inv1",
      newStatus: "PAID",
    });
  });

  it("throws NOT_FOUND error when the invoice does not exist", async () => {
    const updateStatusInput = {
      invoiceId: "inv999",
      newStatus: "PAID" as InvoiceStatus,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findUnique.mockResolvedValue(null);

    await expect(
      updateStatus({
        input: updateStatusInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      updateStatus({
        input: updateStatusInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });

  it("throws FORBIDDEN error when the user does not have permission to update the invoice", async () => {
    const updateStatusInput = {
      invoiceId: "inv1",
      newStatus: "PAID" as InvoiceStatus,
    };

    const mockInvoice = {
      id: "inv1",
      businessId: "biz123",
      distributorId: "dist123",
      dueBy: new Date(),
      status: "UNPAID" as InvoiceStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      items: [
        {
          id: "item1",
          name: "Product A",
          price: new Prisma.Decimal("100.00"),
          quantity: 2,
          invoiceId: "inv1",
          productId: "prod123",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findUnique.mockResolvedValue(mockInvoice);

    await expect(
      updateStatus({
        input: updateStatusInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      updateStatus({
        input: updateStatusInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "FORBIDDEN");
  });
});
