import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import { ZodError } from "zod";
import superjson from "superjson";
import { db } from "../db";

/**
 * Creates the context for each request, providing access to the database and the authenticated user ID.
 *
 * @param {CreateNextContextOptions} opts - The context options from the Next.js request.
 * @returns {Object} The context object containing the database instance and the user ID.
 */
export const createContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;
  const session = getAuth(req);

  const userId = session.userId;

  return {
    db,
    userId,
  };
};

/**
 * The context type for the tRPC router, resolved from the createContext function.
 * @typedef {Object} Context
 * @property {typeof db} db - The database instance.
 * @property {string} userId - The authenticated user ID.
 */
export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Middleware to check if the user is authenticated.
 *
 * @param {Object} opts - The middleware options.
 * @param {Function} opts.next - The next middleware function.
 * @param {Context} opts.ctx - The context object.
 * @throws {TRPCError} If the user is not authenticated.
 */
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

/**
 * Middleware to check if the user is an admin.
 *
 * @param {Object} opts - The middleware options.
 * @param {Function} opts.next - The next middleware function.
 * @param {Context} opts.ctx - The context object.
 * @throws {TRPCError} If the user is not authenticated or not an admin.
 */
const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const user = await db.user.findUnique({
    where: {
      id: ctx.userId,
    },
  });

  if (!user || !user.role || user.role != "admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

/**
 * Helper functions to create tRPC routers with predefined middlewares.
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
