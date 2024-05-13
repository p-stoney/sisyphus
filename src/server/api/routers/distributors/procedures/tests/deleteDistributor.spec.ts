import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { deleteDistributor } from "../deleteDistributor";

describe("deleteDistributor procedure", () => {
  it("successfully deletes a distributor", async () => {
    const deleteDistributorInput = {
      distributorId: "dist123",
    };

    const mockDistributor = {
      id: deleteDistributorInput.distributorId,
      name: "Distributor to Delete",
      email: "delete@dist.com",
      address: "123 Delete St",
      city: "Deletetown",
      state: "DT",
      postalCode: "12345",
      paymentTerms: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });
    testdb.distributor.findUnique.mockResolvedValue(mockDistributor);
    testdb.distributor.delete.mockResolvedValue({
      ...mockDistributor,
      deletedAt: new Date(),
    });

    const result = await deleteDistributor({
      input: deleteDistributorInput,
      ctx,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: mockDistributor.id,
        deletedAt: mockDistributor.deletedAt,
      }),
    );
  });

  it("throws NOT_FOUND error when the distributor does not exist", async () => {
    const deleteDistributorInput = {
      distributorId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });
    testdb.distributor.findUnique.mockResolvedValue(null);

    await expect(
      deleteDistributor({
        input: deleteDistributorInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      deleteDistributor({
        input: deleteDistributorInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
