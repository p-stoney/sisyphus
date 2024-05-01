/* eslint-disable @typescript-eslint/require-await */
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
// import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { ZodError } from "zod";
import superjson from "superjson";
import { db } from "../db";

// Awaited<ReturnType<typeof getAuth>>

// export default async function handler(req: NextApiRequest) {
//   const userId = getAuth(req);

//   return {
//     userId,
//   };
// }

// interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
//   userId: ReturnType<typeof handler>;
// }

// export async function createContextInner: CreateInnerContextOptions {
//   return {
//     db,
//     userId,
//   };
// }

// export const createContextInner = async ({ userId }: { userId: string }) => {
//   return {
//     db,
//     userId,
//   };
// };

// export async function createContext(opts: CreateNextContextOptions) {
//   const auth = getAuth(opts.req);
//   const contextInner = await createContextInner({ auth });

//   return {
//     ...contextInner,
//     req: opts.req,
//     res: opts.res,
//   };
// }

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
    throw new TRPCError({ code: "UNAUTHORIZED" });
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
