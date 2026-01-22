
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { RoleLayout } from "@/components/role-layout"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

    // 🔒 guard pertama
    if (!session) {
    redirect("/")
    }

    // 🔒 guard role
    if (!["admin", "owner"].includes(session.user.tipe)) {
    redirect("/unauthorized")
    }

  return (
    <RoleLayout>
      {children}
    </RoleLayout>
  )
}




