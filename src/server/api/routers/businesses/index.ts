import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { CreateBuinessSchema, RemoveBusinessSchema } from "./validators";
import { create, remove } from "./procedures";

/**
 * Creates the router for business-related endpoints.
 * Utilizes protectedProcedure to ensure these operations are only accessible when authenticated.
 * Each route validates input against predefined Zod schemas and delegates processing to specific procedures.
 *
 * @module BusinessRouter
 */
export const businessRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateBuinessSchema)
    .mutation(async ({ input, ctx }) => create({ input, ctx })),

  remove: protectedProcedure
    .input(RemoveBusinessSchema)
    .mutation(async ({ input, ctx }) => remove({ input, ctx })),
});
