import { NextRequest, NextResponse } from "next/server";

// This function can be marked 'async' if using 'await' inside

export function middleware(request: NextRequest) {
    // We have two kind of paths public paths and private paths
    // public paths===> Public paths are those paths which are accessible to those who has token like signup and login
    // private paths ===> private paths are those paths which are accessible to those who don't have token like /profile etc etc

    const path = request.nextUrl.pathname; // To access path and we don't need to make our middleware client side component

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get("token")?.value || '';

    if (isPublicPath && token) {
        // return NextResponse.redirect("/");
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
        // req.url ==> https://example.com/profile?id=123
        // req.nextUrl ==> /profile 
    }

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
        '/signup'
    ]
}