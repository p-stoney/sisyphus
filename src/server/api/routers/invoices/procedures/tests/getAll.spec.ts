import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { Prisma, type InvoiceStatus } from "@prisma/client";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getAll } from "../getAll";

describe("getAll invoices procedure", () => {
  it("successfully retrieves all invoices for a user", async () => {
    const getAllInput = {
      userId: "user123",
    };

    const mockInvoices = [
      {
        id: "inv1",
        businessId: "biz1",
        distributorId: "dist1",
        dueBy: new Date(),
        status: "UNPAID" as InvoiceStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        distributor: {
          id: "dist1",
          name: "Distributor One",
          email: "email@example.com",
          address: "123 Distributor St",
          city: "DistroCity",
          state: "DC",
          postalCode: "12345",
          paymentTerms: 30,
        },
        items: [
          {
            id: "item1",
            name: "Product A",
            price: new Prisma.Decimal("100.00"),
            quantity: 2,
            productId: "prod1",
          },
        ],
      },
    ];

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findMany.mockResolvedValue(mockInvoices);

    const result = await getAll({
      input: getAllInput,
      ctx,
    });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "inv1",
          totalDue: 200,
          isPaid: false,
        }),
      ]),
    );
  });

  it("throws NOT_FOUND error when no invoices exist for the user", async () => {
    const getAllInput = {
      userId: "user123",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findMany.mockResolvedValue([]);

    await expect(
      getAll({
        input: getAllInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      getAll({
        input: getAllInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
