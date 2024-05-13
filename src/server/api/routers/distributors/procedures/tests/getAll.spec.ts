import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getAll } from "../getAll";

describe("getAll distributors procedure", () => {
  it("successfully retrieves all distributors for a user", async () => {
    const getAllInput = {
      userId: "user123",
    };

    const mockDistributors = [
      {
        id: "dist1",
        name: "Distributor One",
        email: "get@dist.com",
        address: "123 Delete St",
        city: "Gettown",
        state: "GT",
        postalCode: "12345",
        paymentTerms: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        invoices: [
          {
            id: "inv1",
            status: "PAID",
            items: [
              {
                price: 100,
                quantity: 2,
              },
            ],
          },
        ],
      },
    ];

    const ctx = createContextInner({ userId: "user123" });

    testdb.distributor.findMany.mockResolvedValue(mockDistributors);

    const result = await getAll({
      input: getAllInput,
      ctx,
    });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "dist1",
          name: "Distributor One",
          allInvoicesPaid: true,
          totalUnpaidInvoicesAmount: 0,
        }),
      ]),
    );
  });

  it("throws NOT_FOUND error when no distributors exist for the user", async () => {
    const getAllInput = {
      userId: "user123",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.distributor.findMany.mockResolvedValue([]);

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
