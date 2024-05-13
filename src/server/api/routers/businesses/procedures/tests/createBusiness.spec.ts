import { describe, expect, it } from "vitest";
import { Prisma } from "@prisma/client";
import { testdb, createContextInner } from "~/tests/testSetup";
import { create } from "../create";

describe("createBusiness procedure", () => {
  it("successfully creates a new business", async () => {
    const createBusinessInput = {
      userId: "123",
      name: "New Business",
    };

    const mockBusiness = {
      id: "1",
      name: createBusinessInput.name,
      userId: createBusinessInput.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const ctx = createContextInner({ userId: mockBusiness.userId });

    testdb.business.create.mockResolvedValue(mockBusiness);

    const result = await create({
      input: { name: mockBusiness.name },
      ctx: ctx,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: mockBusiness.id,
        name: mockBusiness.name,
      }),
    );
  });

  it("throws CONFLICT error when a business with the same name exists", async () => {
    const createBusinessInput = {
      id: "123",
      name: "Existing Business",
    };

    const ctx = createContextInner({ userId: createBusinessInput.id });

    testdb.business.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("P2002", {
        code: "P2002",
        clientVersion: "1.0.0",
        meta: {},
        batchRequestIdx: 0,
      }),
    );

    await expect(
      create({
        input: { name: createBusinessInput.name },
        ctx: ctx,
      }),
    ).rejects.toHaveProperty("code", "CONFLICT");
  });
});
