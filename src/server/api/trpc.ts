/* eslint-disable @typescript-eslint/require-await */
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
// import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { ZodError } from "zod";
import superjson from "superjson";
import { db } from "../db";
// import { testdb } from "~/tests/testSetup";

// export const createContextInner = ({ userId }: { userId: string }) => {
//   return {
//     db: testdb,
//     userId,
//   };
// };

// export type ContextInner = Awaited<ReturnType<typeof createContextInner>>;

export const createContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;
  const session = getAuth(req);

  const userId = session.userId;

  return {
    db,
    userId,
  };
};

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

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
