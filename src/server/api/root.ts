import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/users";
import { distributorRouter } from "./routers/distributors";
import { invoiceRouter } from "./routers/invoices";
import { businessRouter } from "./routers/businesses";

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
  user: userRouter,
});

export type AppRouter = typeof appRouter;
