import { NextRequest, NextResponse } from "next/server";



export function middleware(request:NextRequest){
    const token=request.cookies.get("token")
    if(!token && request.nextUrl.pathname!=='/login'){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    else if(token && request.nextUrl.pathname!=='/'){
        return NextResponse.redirect(new URL('/',request.url))
    }
    return NextResponse.next()
}

export const config={
    matcher:['/','/((?!api|_next/static|_next/image|favicon.ico).*)']
}