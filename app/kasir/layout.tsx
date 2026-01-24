import { RoleLayout } from '@/components/role-layout'
import { ReactNode } from 'react'
import { redirect } from "next/navigation"
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

interface Props {
    children?: ReactNode
}

export default async function KasirLayout({ children }: Props) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // 🔒 Proteksi login
  if (!session) {
    redirect("/")
  }


  return (
    <RoleLayout>
      {children}
    </RoleLayout>
  )
}