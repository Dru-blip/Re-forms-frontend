import { NextRequest, NextResponse } from "next/server";



export function middleware(request:NextRequest){
    const token=request.cookies.get("token")
    const {pathname}:{pathname:string}=request.nextUrl
    const authRoutes=['/login','/register']


    if(!token && !authRoutes.includes(pathname) ){
        return NextResponse.redirect(new URL(pathname,request.url))
    }
    else if(token && pathname!=='/'){
        return NextResponse.redirect(new URL('/',request.url))
    }
    return NextResponse.next()
}

export const config={
    matcher:['/','/((?!api|_next/static|_next/image|favicon.ico).*)','/login','/register']
}