
// API untuk keluar akun 

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST() {
  await auth.api.signOut({
    headers: await headers(),
  })

  return NextResponse.json({ success: true })
}


