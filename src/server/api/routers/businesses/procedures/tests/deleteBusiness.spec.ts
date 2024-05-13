import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { remove } from "../remove";

describe("deleteBusiness procedure", () => {
  it("successfully deletes a business", async () => {
    const deleteBusinessInput = {
      businessId: "123",
    };

    const mockBusiness = {
      id: deleteBusinessInput.businessId,
      name: "Business to Delete",
      userId: "user123",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });
    testdb.business.findUnique.mockResolvedValue(mockBusiness);
    testdb.business.delete.mockResolvedValue({
      ...mockBusiness,
      deletedAt: new Date(),
    });

    const result = await remove({
      input: deleteBusinessInput,
      ctx,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: mockBusiness.id,
        deletedAt: mockBusiness.deletedAt,
      }),
    );
  });

  it("throws NOT_FOUND error when the business does not exist", async () => {
    const deleteBusinessInput = {
      businessId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });
    testdb.business.findUnique.mockResolvedValue(null);

    await expect(
      remove({
        input: deleteBusinessInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      remove({
        input: deleteBusinessInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
