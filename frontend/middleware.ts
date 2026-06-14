// middleware.ts (Assumed location for global route protection in Next.js App Router)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect all routes except /login and the API endpoints.
 * It checks for a valid authentication token cookie.
 */
export async function middleware(request: NextRequest) {
    // 1. Define paths that do NOT require authentication
    const publicPaths = ['/login', '/api','register']; // Add any other public paths as needed

    const pathname = request.nextUrl.pathname;
    // Check if the current path is a public path
    if (publicPaths.some(path => pathname.startsWith(path))) {
        console.log(pathname)
        return NextResponse.next();
    }

    // 2. Check for token existence in cookies (Assuming token is stored in an HttpOnly cookie)
    const authToken = request.cookies.get('token')?.value;

    if (!authToken) {
        // No token found, redirect to login page
        console.log("Middleware blocking access: No auth token found.");
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    // OPTIONAL: Implement token validation logic here (e.g., check expiry date within the token)
    // If validation fails, redirect to login page and clear potentially stale cookies.

    // Token is present, allow access to the requested path
    return NextResponse.next();
}

// 3. Configure which paths middleware should run on
export const config = {
    matcher: [
        /* Match all paths except those starting with /api or /login or /register */
        '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    ],
};