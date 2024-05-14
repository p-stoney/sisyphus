import { createTRPCRouter } from "./trpc";
import { businessRouter } from "./routers/businesses";
import { distributorRouter } from "./routers/distributors";
import { invoiceRouter } from "./routers/invoices";
import { productRouter } from "./routers/products";
import { userRouter } from "./routers/users";

/**
 * Combines all TRPC sub-routers into a single main router for the application.
 * This allows the application to organize and manage TRPC endpoints across different domains
 * such as user, business, distributors, invoices, etc.
 *
 * @module AppRouter
 */
export const appRouter = createTRPCRouter({
  business: businessRouter,
  distributor: distributorRouter,
  invoice: invoiceRouter,
  product: productRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
