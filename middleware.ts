import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")
    const { pathname }: { pathname: string } = request.nextUrl

    const isAuthencticated = !!token
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith("/register")

    if (isAuthencticated) {
        if (isAuthPage) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return null
    }

    if (!isAuthencticated && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: ['/', '/login', '/register']
}