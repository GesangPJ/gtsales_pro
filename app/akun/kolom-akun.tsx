
// Komponen Kolom Akun

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"

export type Akun = {
    id: string
    name: string
    email:string
    tipe: string
}

export const columns: ColumnDef<Akun>[] = [
    {
    id: "no",
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
    accessorKey: "name",
    size:80,
    minSize:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Akun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    size:80,
    minSize:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Alamat Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="pl-2">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "tipe",
    size:30,
    minSize:12,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Tipe Akun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("tipe")}
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
          <Link href={`/akun/detail-akun/${id}`}>Detail</Link>
        </Button>
      </div>
      )
      
    }
  },
  {
    accessorKey:"id",
    header: ()=><></>,
    cell: () => <></>
  },

]
