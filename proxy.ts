import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    const pathname = req.nextUrl.pathname

    const isAjouterPage = pathname === "/ajouter"
    const isEditPage = /^\/entreprises\/[^/]+\/edit$/.test(pathname)

    const isProtectedPage = isAjouterPage || isEditPage

    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/ajouter", "/entreprises/:path*"],
}