"use client"

import * as React from "react"
import {
  IconCategoryPlus,
  IconDatabaseDollar,
  IconCashRegister,
  IconHelp,
  IconTruckLoading,
  IconAppsFilled,
  IconCubePlus,
  IconSettings,
  IconStack3,
  IconTableFilled,
  IconLayoutDashboard,
  IconReceipt,
  IconChartHistogram,
} from "@tabler/icons-react"
import Link from "next/link"
import { NavUser } from "./nav-user"


import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  
  navMain: [
    {
      title: "Kasir",
      url: "/kasir",
      icon: IconCashRegister,
    },
    
    
  ],
  navTambah:[
    {
      title: "Daftar Produk",
      url: "/produk",
      icon: IconTableFilled,
    },
    {
      title: "Stok Produk",
      url: "/produk/stok-produk",
      icon: IconStack3,
    },
  ],
  navVendor:[
    {
      title: "Daftar Pembelian",
      url: "/pembelian/data-pembelian",
      icon: IconTableFilled,
    },
    {
      title: "Pembelian Produk",
      url: "/pembelian",
      icon: IconTruckLoading,
    },

  ],
  navSecondary: [
    {
      title: "Panduan",
      url: "#",
      icon: IconHelp,
    },
  ],
}

import { AppInfo } from "./app-info"

interface UserSidebarProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function UserSidebar({user}: UserSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              data-logo
              className="data-[slot=sidebar-menu-button]:p-1.6 hover:bg-transparent hover:text-foreground"
            >
              <Link href="/" className="hover:bg-none">
                <IconAppsFilled/>
                <span className="text-base font-semibold">GTSALES</span> <span className="text-yellow-500 font-bold">PRO</span>
                <AppInfo/>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <NavMain items={data.navMain} />
        <SidebarSeparator />
        <NavSecondary items={data.navTambah} className="mt-10px" />
         <SidebarSeparator />
         <NavSecondary items={data.navVendor} className="mt-10px" />
          <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
