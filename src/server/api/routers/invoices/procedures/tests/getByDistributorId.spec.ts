import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { Prisma, type InvoiceStatus } from "@prisma/client";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getByDistributorId } from "../getByDistributorId";

describe("getByDistributorId invoice procedure", () => {
  it("successfully retrieves all invoices for a distributor by ID", async () => {
    const getByDistributorIdInput = {
      distributorId: "dist123",
    };

    const mockInvoices = [
      {
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
            price: new Prisma.Decimal("100"),
            quantity: 2,
            invoiceId: "inv1",
            productId: "prod1",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ],
      },
    ];

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findMany.mockResolvedValue(mockInvoices);

    const result = await getByDistributorId({
      input: getByDistributorIdInput,
      ctx,
    });

    expect(result[0]).toHaveProperty("id", mockInvoices[0]!.id);
  });

  it("throws NOT_FOUND error when no invoices exist for the specified distributor", async () => {
    const getByDistributorIdInput = {
      distributorId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findMany.mockResolvedValue([]);

    await expect(
      getByDistributorId({
        input: getByDistributorIdInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      getByDistributorId({
        input: getByDistributorIdInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
