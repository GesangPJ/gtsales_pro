import { RoleLayout } from '@/components/role-layout'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export default function KasirLayout({ children }: Props) {
  return (
    <RoleLayout>
      {children}
    </RoleLayout>
  )
}