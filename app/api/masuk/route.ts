
// Verifikasi Cloudflare Turnstile Token 

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(req: Request) {
  const { email, password, turnstileToken } = await req.json()

  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Captcha required" },
      { status: 400 }
    )
  }

  // 🔐 VERIFY KE CLOUDFLARE
  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: turnstileToken,
      }),
    }
  )

  const result = await verify.json()

  if (!result.success) {
    return NextResponse.json(
      { error: "Captcha tidak valid" },
      { status: 403 }
    )
  }

 const data = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/kasir",
    },
    headers: await headers(),
  })

  return NextResponse.json(data)
}