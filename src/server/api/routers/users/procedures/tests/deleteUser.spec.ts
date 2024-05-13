import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { deleteUser } from "../deleteUser";

describe("deleteUser procedure", () => {
  it("successfully deletes a user", async () => {
    const deleteUserInput = {
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

    const ctx = createContextInner({ userId: "user123" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });

    testdb.user.findUnique.mockResolvedValue(mockUser);
    testdb.user.delete.mockResolvedValue({
      ...mockUser,
      deletedAt: new Date(),
    });

    const result = await deleteUser({
      input: deleteUserInput,
      ctx,
    });

    expect(result).toEqual({
      id: mockUser.id,
      deletedAt: mockUser.deletedAt,
    });
  });

  it("throws NOT_FOUND error when the user does not exist", async () => {
    const deleteUserInput = {
      userId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "nonexistent" });

    testdb.$transaction.mockImplementation(async (transactionalQueries) => {
      return transactionalQueries(testdb);
    });

    testdb.user.findUnique.mockResolvedValue(null);

    await expect(
      deleteUser({
        input: deleteUserInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      deleteUser({
        input: deleteUserInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "NOT_FOUND");
  });
});
