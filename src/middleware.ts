import { clerkMiddleware } from "@clerk/nextjs/server";

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default clerkMiddleware();


// Establish authorization middleware for routes based on role/org/tenant
// https://clerk.com/docs/references/nextjs/clerk-middleware