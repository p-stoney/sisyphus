import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getById } from "../getById";
import { mockDistributor } from "~/__mocks__/mocks";

describe("getById distributor procedure", () => {
  it("successfully retrieves a distributor by ID", async () => {
    const getByIdInput = {
      distributorId: "dist123",
    };

    testdb.distributor.findUnique.mockResolvedValue(mockDistributor);

    const ctx = createContextInner({ userId: "user123" });

    const result = await getById({
      input: getByIdInput,
      ctx,
    });

    expect(result).toHaveProperty("id", mockDistributor.id);
    expect(result.invoices.length).toEqual(mockDistributor.invoices.length);
  });

  it("throws NOT_FOUND error when the distributor does not exist", async () => {
    const getByIdInput = {
      distributorId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.distributor.findUnique.mockResolvedValue(null);

    await expect(
      getById({
        input: getByIdInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      getById({
        input: getByIdInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
