import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "../utils/session";

const protectedRoutes = ['/profile']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname

    const isProtectedRoutes = protectedRoutes.map(route => route.startsWith(path))

    const cookie = (await cookies()).get('session')?.value
    const session = await verifySession(cookie)
    
    if(isProtectedRoutes && !session?._id) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl))
    }

   return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*'],
}
