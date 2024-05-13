import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { testdb, createContextInner } from "~/tests/testSetup";
import { getById } from "../getById";
import { mockInvoices } from "~/__mocks__/mocks";

describe("getById invoice procedure", () => {
  it("successfully retrieves an invoice by ID", async () => {
    const getByIdInput = {
      invoiceId: "inv1", // Use an existing ID from the mock data
    };

    const mockInvoice = mockInvoices.find(
      (invoice) => invoice.id === getByIdInput.invoiceId,
    );

    if (!mockInvoice) {
      throw new Error(
        `Invoice with ID "${getByIdInput.invoiceId}" not found in mock data`,
      );
    }

    testdb.invoice.findUnique.mockResolvedValue(mockInvoice);
    testdb.invoice.findMany.mockResolvedValue([mockInvoice]);

    const ctx = createContextInner({ userId: "user123" });

    const result = await getById({
      input: getByIdInput,
      ctx,
    });

    expect(result.items).toHaveLength(mockInvoice.items.length);
  });

  it("throws NOT_FOUND error when the invoice does not exist", async () => {
    const getByIdInput = {
      invoiceId: "nonexistent",
    };

    const ctx = createContextInner({ userId: "user123" });

    testdb.invoice.findUnique.mockResolvedValue(null);

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
