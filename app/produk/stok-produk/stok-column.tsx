import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import StokCell from "./stok-cell"
import UpdateStokButton from "./update-stok-button"

export type StokProduk = {
  id: number,
  nama_produk: string,
  stok: number,
}

export function stokColumns(
  editedStok: Record<number, number>,
  setEditedStok: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
): ColumnDef<StokProduk>[] {
  return [
   
    {
      id: "no",
      size:20,
      minSize:10,
      header: () => <div className="text-center">No.</div>,
      cell: ({ row, table }) => {
        const index = table
          .getSortedRowModel()
          .flatRows
          .findIndex(r => r.id === row.id)

        return <div className="text-center">{index + 1}</div>
      },
      enableSorting: false,
    },
    {
      accessorKey: "nama_produk",
      size:150,
      minSize:100,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Nama Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize pl-2">
          {row.getValue("nama_produk")}
        </div>
      ),
    },
    {
      accessorKey: "stok",
      header: "Stok",
      cell: ({ row }) => {
        const id = row.original.id
        const original = row.original.stok
        const value = editedStok[id] ?? original

        return (
          <StokCell
            id={id}
            originalStok={original}
            value={value}
            onCommit={(v) =>
              setEditedStok(prev => ({ ...prev, [id]: v }))
            }
          />
        )
      },
    },
    {
      id: "update",
      header: "",
      cell: ({ row }) => {
        const id = row.original.id
        const original = row.original.stok
        const value = editedStok[id]

        if (value === undefined || value === original) return null

        return (
          <UpdateStokButton
            id={id}
            stok={value}
            onSuccess={() =>
              setEditedStok(prev => {
                const copy = { ...prev }
                delete copy[id]
                return copy
              })
            }
          />
        )
      },
    },
     {
      accessorKey: "id",
      header: () => null,
      cell: () => null,
      size: 0,
    },
  ]
}