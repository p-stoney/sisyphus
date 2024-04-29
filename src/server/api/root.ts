import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/users";
import { distributorRouter } from "./routers/distributors";
import { invoiceRouter } from "./routers/invoices";

export const appRouter = createTRPCRouter({
  user: userRouter,
  distributor: distributorRouter,
  invoice: invoiceRouter,
});

export type AppRouter = typeof appRouter;

// TODO: In formUtils, look at optional properties of FormValues
// TODO: Decide default import or not
// TODO: Determine return type of procedures
// TODO: Implement dynamic profile picture fetch in AppBar
// TODO: Compare findUnique to findMany approach in createUserAssociation + removeUserAssociation, decide on best approach
// TODO: Revisit deleteUser, deleteBusiness, deleteDistributor to implement soft-delete + cascade delete
// TODO: Refactor update* procedures after creation of front-end * details
// TODO: Figure out if RBAC in middleware or /server/api/trpc
// TODO: Revisit testing with createInnerTRPCContext
// TODO: Revisit and refine env.js
// TODO: Revisit lazy export everything
// TODO: createCallerFactory as needed for testing
// export const createCaller = createCallerFactory(appRouter);
