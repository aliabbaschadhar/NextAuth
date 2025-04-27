import { NextRequest, NextResponse } from "next/server";

// We have two kinds of paths: public paths and private paths
// Public paths: Routes accessible to everyone without requiring authentication tokens (e.g., signup, login)
// Private paths: Routes accessible only to authenticated users who have valid tokens (e.g., profile, dashboard)

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname; // To access path and we don't need to make our middleware client side component

    const isPublicPath = path === '/login' || path === '/signup' || path === "/verifyemail"

    const token = request.cookies.get("token")?.value || '';

    if (isPublicPath && token) {
        // return NextResponse.redirect("/");
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
        // req.url ==> https://example.com/profile?id=123
        // req.nextUrl ==> /profile 
    }

    //If user is trying to access a private path and doesn't have a token, redirect them to the login page
    // If user is trying to access a public path and has a token, redirect them to the profile page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See 'Matching Paths' below to learn more

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
        "/verifyemail",
    ]
}