import { RoleLayout } from '@/components/role-layout'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function PembelianLayout({ children }: LayoutProps) {
  return (
    <RoleLayout>
      {children}
    </RoleLayout>
  );
}



