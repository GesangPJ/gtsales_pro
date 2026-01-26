
// Komponen Kolom Pembelian
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { ArrowUpDown} from "lucide-react"
import { formatTanggal } from "@/lib/formattanggal"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"


export type Pembelian = {
  id: number
  kode: string
  updatedAt: string
  jumlahtotal: number

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
        <div>
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
  id: "update_status",
  header: "Status",
  size: 120,
  minSize: 100,
  cell: ({ row }) => {
    const id = row.getValue("id") as number
    const { data: session } = authClient.useSession()
    const userId = session?.user.id

    const handleUpdateStatus = async (endpoint: string) => {
      if (!userId) {
        toast.error("Mohon login terlebih dahulu")
        return
      }

      try {
        const res = await fetch(`${baseUrl}/api/${endpoint}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userId })
        })

        if (res.ok) {
          toast.success(`Status berhasil diupdate 🎉`)
          window.location.reload()  // Refresh table
        } else {
          toast.error("Gagal update status")
        }
      } catch (error) {
        toast.error("Koneksi gagal")
      }
    }

    return (
      <div className="flex gap-1 justify-center">
        <ButtonGroup>
            <Button
          size="lg"
          className="bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600/20  dark:bg-green-400/10 dark:hover:bg-green-400/20 dark:focus-visible:ring-green-400/40 dark:text-green-400 text-sm px-2 py-1"
          onClick={() => handleUpdateStatus("selesai-pembelian")}
        >
          Selesai
        </Button>
        
        {/* Merah - Batal */}
        <Button
          size="lg"
          className="bg-red-600/10 text-red-600 hover:bg-red-600/20 focus-visible:ring-red-600/20 dark:bg-red-400/10 dark:hover:bg-red-400/20 dark:focus-visible:ring-red-400/40 dark:text-red-400 text-sm px-2 py-1"
          onClick={() => handleUpdateStatus("batal-pembelian")}
        >
          Batal
        </Button>
        </ButtonGroup>
        
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
