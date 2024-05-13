import { describe, expect, it } from "vitest";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { create } from "../create";

describe("createDistributor procedure", () => {
  it("successfully creates a new distributor", async () => {
    const createDistributorInput = {
      businessId: "biz123",
      name: "New Distributor",
      email: "test@distributor.com",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "90210",
      paymentTerms: 30,
    };

    const mockDistributor = {
      id: "dist1",
      ...createDistributorInput,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.distributor.create.mockResolvedValue(mockDistributor);

    const result = await create({
      input: createDistributorInput,
      ctx,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: mockDistributor.id,
        name: mockDistributor.name,
        email: mockDistributor.email,
      }),
    );
  });

  it("throws CONFLICT error when a distributor with the same name exists", async () => {
    const createDistributorInput = {
      businessId: "biz123",
      name: "Existing Distributor",
      email: "test@distributor.com",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "90210",
      paymentTerms: 30,
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.distributor.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("P2002", {
        code: "P2002",
        clientVersion: "1.0.0",
        meta: {},
        batchRequestIdx: 0,
      }),
    );

    await expect(
      create({
        input: createDistributorInput,
        ctx,
      }),
    ).rejects.toThrow(TRPCError);

    await expect(
      create({
        input: createDistributorInput,
        ctx,
      }),
    ).rejects.toHaveProperty("code", "CONFLICT");
  });
});
