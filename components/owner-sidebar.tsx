
// Sidebar Owner

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
      url: "/",
      icon: IconCashRegister,
    },
    {
      title: "Dashboard",
      url:"/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Data Penjualan",
      url: "/data-penjualan",
      icon: IconDatabaseDollar,
    },
    {
      title: "Laporan Penjualan",
      url:"/laporan/penjualan",
      icon:IconChartHistogram,

    },
    
    
  ],
  navTambah:[
    {
      title: "Tabel Barang",
      url: "/data-barang",
      icon: IconTableFilled,
    },
    {
      title: "Tambah Barang",
      url: "/tambah-barang",
      icon: IconCubePlus,
    },
    
    {
      title: "Stok Barang",
      url: "/stok-barang",
      icon: IconStack3,
    },
    {
      title: "Kategori Barang",
      url: "/kategori-barang",
      icon: IconCategoryPlus,
    },

  ],
  navVendor:[
    {
      title: "Daftar Pembelian",
      url: "/daftar-pembelian",
      icon: IconTableFilled,
    },
    {
      title: "Pembelian Barang",
      url: "/buat-pembelian",
      icon: IconTruckLoading,
    },
    {
      title: "Status Pembelian",
      url: "/status-pembelian",
      icon: IconReceipt,
    },
    {
      title: "Laporan Pembelian",
      url: "/laporan/pembelian",
      icon: IconChartHistogram,
    },

  ],
  navSecondary: [
    
    {
      title: "Pengaturan Toko",
      url: "/pengaturan",
      icon: IconSettings,
    },
    // {
    //   title: "Panduan",
    //   url: "#",
    //   icon: IconHelp,
    // },
  ],
}

import { AppInfo } from "./app-info"

interface OwnerSidebarProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function OwnerSidebar({user}: OwnerSidebarProps ) {
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
        {/* <span className="px-2">Barang</span> */}
        <NavSecondary items={data.navTambah} className="mt-10px" />
         <SidebarSeparator />
         <NavSecondary items={data.navVendor} className="mt-10px" />
          <SidebarSeparator />
          <NavSecondary items={data.navSecondary} className="mt-10px" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

