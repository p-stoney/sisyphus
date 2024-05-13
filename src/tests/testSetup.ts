import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";

/**
 * Test setup for unit testing with vitest.
 * Configures a mock Prisma client and resets it before each test to ensure test isolation.
 * Provides a mock context for tests, including the mock database client and mock user session.
 */
export const testdb = mockDeep<PrismaClient>();

export const createContextInner = ({ userId }: { userId: string }) => {
  return {
    db: testdb,
    userId,
  };
};

export type ContextInner = Awaited<ReturnType<typeof createContextInner>>;

beforeEach(() => {
  mockReset(testdb);
});
