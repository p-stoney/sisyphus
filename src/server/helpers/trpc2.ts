/* eslint-disable @typescript-eslint/require-await */
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "../db";
import { ZodError } from "zod";
import superjson from "superjson";

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  auth: ReturnType<typeof getAuth>;
}

// export default async function handler(req: NextApiRequest) {
//     const userId = getAuth(req);
//     // const contextInner = await createContextInner({ userId });

//     return {
//       userId,
//       // ...contextInner,
//       // req,
//       // res,
//     };
//   }

export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    db,
    auth: opts.auth,
  };
}

export async function createContext(opts: CreateNextContextOptions) {
  const auth = getAuth(opts.req);
  const contextInner = await createContextInner({ ...opts, auth });

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

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
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const user = await db.user.findUnique({
    where: {
      id: ctx.auth.userId,
    },
  });

  if (!user || !user.role || user.role != "admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      userId: ctx.auth.userId,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
