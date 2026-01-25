
// Kolom Tabel Distributor


"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"

export type Distributor = {
    id: number
    nama: string
    email:string
    alamat: string
    notelp: string
    keterangan: string
}

export const columns: ColumnDef<Distributor>[] = [
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
    accessorKey: "nama",
    size:80,
    minSize:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Distributor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("nama")}
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
    accessorKey: "alamat",
    size:30,
    minSize:12,
    header: "Alamat",
    cell: ({ row }) => (
      <div className="pl-1 break-words hyphens-auto leading-relaxed whitespace-normal">
        {row.getValue("alamat") as string}
      </div>
    ),
  },
  {
    accessorKey: "notelp",
    size:30,
    minSize:12,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        No. Telepon
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("notelp")}
      </div>
    ),
  },
  {
    accessorKey: "keterangan",
    size:30,
    minSize:12,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Keterangan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("keterangan")}
      </div>
    ),
  },
  // {
  //   id: "detail",
  //   header:" ",
  //   size:32,
  //   minSize:20,
  //   cell: ({row}) => {
  //     const id = row.getValue("id") as number

  //     return (
  //       <div className="flex justify-center">
  //       <Button asChild size="sm" variant="outline">
  //         <Link href={`/distributor/detail-distributor/${id}`}>Detail</Link>
  //       </Button>
  //     </div>
  //     )
      
  //   }
  // },
  {
    accessorKey:"id",
    header: ()=><></>,
    cell: () => <></>
  },

]





