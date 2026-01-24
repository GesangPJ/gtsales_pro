import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // PUBLIC ROUTES
  if (pathname === "/") {
    return NextResponse.next()
  }

  // ADMIN / OWNER ONLY
  if (
    ["/akun", "/tambah-produk", "/tambah-kategori", "/laporan"].some(p =>
      pathname.startsWith(p)
    )
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (!["admin", "owner"].includes(session.user.tipe)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return NextResponse.next()
  }

  // LOGIN REQUIRED
  if (
    ["/kasir", "/produk", "/pembelian"].some(p =>
      pathname.startsWith(p)
    )
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico).*)",
  ],
}
