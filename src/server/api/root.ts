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

// TODO: Setup environmentMatchGlobs in test.config.js
// TODO: Remove deprecated procedures and package.json dependencies
// TODO: Abstract out test matchers and factory functions
// TODO: Ensure procedures have consistent naming conventions (delete > deleteUser)
// TODO: Modify createUser to coordinate Clerk userId with User userId
// TODO: Decide default import or not
// TODO: Uniform return type of procedures
// TODO: Implement dynamic profile picture fetch in AppBar
// TODO: Compare findUnique to findMany approach in createUserAssociation + removeUserAssociation, decide on best approach
// TODO: Implement RBAC with Clerk and User roles
// TODO: Revisit and refine env.js
// TODO: Implement lazy loading
