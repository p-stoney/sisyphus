import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import superjson from "superjson";

/**
 * Generates server-side helpers for tRPC with the necessary context and transformer.
 *
 * @returns {ReturnType<typeof createServerSideHelpers>} The server-side helpers.
 */
export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson,
  });
