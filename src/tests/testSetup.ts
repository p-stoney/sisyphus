import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";

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
