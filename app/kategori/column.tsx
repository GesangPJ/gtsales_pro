"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export type Kategori = {
  id: number
  nama: string
}

export const columns: ColumnDef<Kategori>[] = [
  {
    accessorKey: "id",
    size: 10,
    header: "ID",
    
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nama")}
      </div>
    ),
  },
]
