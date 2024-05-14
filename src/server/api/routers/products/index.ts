import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { GetAllSchema } from "./validators";
import { getAll } from "./procedures";

/**
 * Creates the router for product-related endpoints.
 * Utilizes protectedProcedure to ensure these operations are only accessible when authenticated.
 * Each route validates input against predefined Zod schemas and delegates processing to specific procedures.
 *
 * @module ProductRouter
 */
export const productRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetAllSchema)
    .query(async ({ input, ctx }) => getAll({ input, ctx })),
});
