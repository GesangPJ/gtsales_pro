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
  IconReceipt,
  IconChartHistogram,
  IconTablePlus,
  IconUserHexagon,
  IconUsersPlus,
  IconBuildingWarehouse,
  IconDatabasePlus,
  IconFileInvoice,
  IconPencilPlus,
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
    {
      title: "Data Penjualan",
      url: "/penjualan",
      icon: IconDatabaseDollar,
    },
    
  ],
  navTambah:[
    {
      title: "Daftar Produk",
      url: "/produk",
      icon: IconTableFilled,
    },
    {
      title: "Tambah Produk",
      url: "/tambah-produk",
      icon: IconCubePlus,
    },
    
    {
      title: "Stok Produk",
      url: "/produk/stok-produk",
      icon: IconStack3,
    },
    {
      title: "Kategori Produk",
      url: "/kategori",
      icon: IconCategoryPlus,
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
    {
      title: "Status Pembelian",
      url: "/status-pembelian",
      icon: IconReceipt,
    },
  ],
  navAkun:[
    {
      title:"Daftar Akun",
      url: "/akun",
      icon: IconUserHexagon,
    },
    {
      title: "Tambah Akun",
      url:"/akun/tambah-akun",
      icon: IconUsersPlus,

    },
  ],
  navSecondary: [
    
    {
      title: "Pengaturan",
      url: "/pengaturan",
      icon: IconSettings,
    },
    {
      title: "Panduan",
      url: "#",
      icon: IconHelp,
    },
  ],
  distributor:[
    {
      title: "Distributor",
      url: "/distributor",
      icon: IconBuildingWarehouse,

    },
    {
      title: "Tambah Distributor",
      url:"/distributor/tambah-distributor",
      icon: IconDatabasePlus,
    },
  ],
  jurnal:[
    {
      title:"Data Jurnal",
      url: "/jurnal",
      icon: IconFileInvoice,

    },
    {
      title: "Tambah Jurnal",
      url: "/jurnal/tambah",
      icon: IconPencilPlus,

    },
  ],
}

import { AppInfo } from "./app-info"

interface AdminSidebarProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
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
          <NavSecondary items={data.distributor} className="mt-10px" />
          <SidebarSeparator />
          <NavSecondary items={data.jurnal} className="mt-10px" />
          <SidebarSeparator />
         <NavSecondary items={data.navAkun} className="mt-10px" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
