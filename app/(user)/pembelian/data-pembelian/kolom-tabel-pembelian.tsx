
// Komponen Kolom Pembelian
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"
import { formatTanggal } from "@/lib/formattanggal"

export type Pembelian = {
  id: number
  kode: string
  updatedAt: string
  jumlahtotal: number
  status: string
  biayakirim: number

}

export const columns: ColumnDef<Pembelian>[] = [


  {
    id: "no",
    // header: "No",
    header: () => {
      return (
          <div className="text-center w-1.5">No.</div>
      )
    },
    size: 10,
    cell: ({ row, table }) => {
      // Index berdasarkan row yang sedang ditampilkan (respect sorting & filtering)
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id)
      return <p className="text-center">{index + 1}.</p>
    },
    enableSorting: false,
  },
  {
    accessorKey: "updatedAt",
    size: 50,
    minSize: 20,
    header: () => {
      return ( <div className="text-center">Tanggal</div>  )
    },
    cell: ({row}) => {
      return(
        <div className="text-center">
          {formatTanggal(row.getValue("updatedAt"))}
        </div>
      )
    }
  },
  {
    accessorKey: "kode",
    size:100,
    minSize:30,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kode Pembelian
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("kode")}
      </div>
    ),
  },
  {
    accessorKey: "jumlahtotal",
    size:50,
    minSize:12,
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Jumlah Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("jumlahtotal"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
    accessorKey: "biayakirim",
    size:50,
    minSize:12,
    header:"Biaya Kirim",
    cell: ({ row }) => {
      const harga = parseInt(row.getValue("biayakirim"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,  // Hilangkan .00
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    size:30,
    header: ({ column }) => (
      <div className="w-8">
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "detail",
    header:" ",
    size:32,
    minSize:20,
    cell: ({row}) => {
      const id = row.getValue("id") as number

      return (
        <div className="flex justify-center">
        <Button asChild size="sm" variant="outline">
          <Link href={`/pembelian/detail-pembelian/${id}`}>Detail</Link>
        </Button>
      </div>
      )
      
    }

  },
  {
    accessorKey:"id",
    size:0,
    minSize:0,
    header: ()=><></>,
    cell: () => <></>
  },
]
