
import { RoleLayout } from '@/components/role-layout'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export default function DashboardLayout({children}: Props) {
 return (
    <RoleLayout>
      {children}
    </RoleLayout>
  )
}