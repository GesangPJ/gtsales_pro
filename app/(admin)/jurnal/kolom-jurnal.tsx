// Komponen Kolom jurnal
'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export type jurnalkolom = {
    id: number
    kode: string
    akun: string
    keterangan: string
    debit: number
    kredit: number
    updatedAt: string
}

export const columns: ColumnDef<jurnalkolom>[] = [
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
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id)
      return <p className="text-center">{index + 1}.</p>
    },
    enableSorting: false,
  },
  {
    accessorKey: "akun",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Akun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("akun")}
      </div>
    ),
  },
   {
    accessorKey: "kode",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kode
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
    accessorKey: "debit",
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
         Debit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("debit"))
      
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
    accessorKey: "kredit",
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kredit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("kredit"))
      
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
    accessorKey: "keterangan",
    size:150,
    minSize:50,
    header:"keterangan",
  },
]
