import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getBusinessId } from "../getBusinessId";

describe("getBusinessId procedure", () => {
  it("successfully retrieves the business ID for a user", async () => {
    const getBusinessIdInput = {
      userId: "user123",
    };

    const mockUser = {
      id: "user123",
      email: "mockuser@gmail.com",
      emailVerified: new Date(),
      image: null,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const mockBusiness = {
      id: "business1",
      name: "New Business",
      userId: "user123",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.user.findUnique.mockResolvedValue(mockUser);
    testdb.business.findFirst.mockResolvedValue(mockBusiness);

    const result = await getBusinessId({
      input: getBusinessIdInput,
      ctx,
    });

    expect(result).toEqual(mockBusiness.id);
  });

  it("throws NOT_FOUND error when no businesses exist for the user", async () => {
    const getBusinessIdInput = {
      userId: "user999",
    };

    const ctx = createContextInner({ userId: "user999" });

    testdb.user.findUnique.mockResolvedValue({
      id: "user999",
      email: "test@user.com",
      emailVerified: new Date(),
      image: null,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    testdb.business.findFirst.mockResolvedValue(null);

    await expect(
      getBusinessId({
        input: getBusinessIdInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      getBusinessId({
        input: getBusinessIdInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
