import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

        // Example: Role-based protection
        if (isAdminPage && token?.role !== "admin") {
            // If they aren't an admin, send them to the home page or a denied page
            return NextResponse.rewrite(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            // This middleware only runs if authorized() returns true
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login", // Redirect here if not logged in
        },
    }
);

// Define which routes this middleware applies to
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/admin/:path*",
        "/checkout/:path*"
    ],
};