
// Komponen Form Masuk
'use client'
import { useState} from "react"
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
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

type LoginProps = React.HTMLAttributes<HTMLDivElement>

export function LoginForm({ className, ...props }: LoginProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true);

    try {
      const {error, data} = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/kasir",
      });

    if (error) {
        console.warn("Gagal masuk akun:", error)
        toast.error(error.message ?? 'Gagal masuk akun')
        return
      }

    toast.success("Login berhasil!");

  } catch (error: any) {
    console.error("Login error:", error);
    toast.error(error.message || "Login gagal");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Selamat Datang</CardTitle>
          <CardDescription className="text-muted-foreground text-sm font-mono">
            Silahkan masuk menggunakan Email dan Password anda
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
          
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className='mt-2 flex-1 w-full h-10 text-lg bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
              >
                {loading ? "Mohon tunggu..." : "Masuk"}
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




