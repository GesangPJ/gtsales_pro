
// Komponen Form Masuk
'use client'
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AppInfo } from "./app-info"
import { Turnstile } from '@marsidev/react-turnstile'
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"

type LoginProps = React.HTMLAttributes<HTMLDivElement>

export function LoginForm({ className, ...props }: LoginProps) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [turnstileToken, setTurnstileToken] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!turnstileToken) {
    toast.error("Selesaikan captcha dulu")
    return
  }

  setLoading(true)

  const res = await fetch(`${baseUrl}/api/masuk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      turnstileToken,
    }),
  })

  const data = await res.json()
  setLoading(false)

  if (!res.ok) {
    toast.error(data.error ?? "Login gagal")
    return
  }

  toast.success("Login berhasil")
  router.replace("/app/kasir")
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">GTSALES <span className="text-yellow-600 font-bold">PRO</span><AppInfo/></CardTitle>
          <CardDescription>
            Masuk menggunakan Email dan Password anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Turnstile
                  siteKey="0x4AAAAAACNa3VJKmiLYiO-S"
                  options={{
                    action: 'submit-form',
                    theme: 'light',
                    size: 'compact',
                    language: 'es',
                }}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => {
                    setTurnstileToken("")
                    toast.error("Captcha error, coba lagi")
                  }}
                />
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2"
              >
                {loading ? "Masuk..." : "Masuk"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        &copy; 2026 GESANG PAUDRA JAYA
      </FieldDescription>
    </div>
  )
}




