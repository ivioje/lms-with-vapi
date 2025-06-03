import { clerkMiddleware } from "@clerk/nextjs/server";

// Export the correct middleware function
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|static|.*\\..*|_vercel|favicon.ico).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
