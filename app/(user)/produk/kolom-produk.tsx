"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"

type Produk = {
  id: number
  nama_produk: string,
  harga_jual: number,
  harga_beli: number,
  stok: number,
  namaKategori?: string,
  jenis:string,
  barcode: number,
}

export const columns: ColumnDef<Produk>[] = [


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
    accessorKey: "nama_produk",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Barang
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
    accessorKey: "harga_jual",
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Harga Jual
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("harga_jual"))
      
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
    accessorKey: "harga_beli",
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Beli
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("harga_beli"))
      
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
    accessorKey: "namaKategori",
    size:30,
    header: ({ column }) => (
      <div className="w-8">
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
        Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("namaKategori")}
      </div>
    ),
  },
  {
    accessorKey: "jenis",
    size:30,
    header: ({ column }) => (
      <div className="w-8">
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
        Jenis
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("jenis")}
      </div>
    ),
  },
  {
    accessorKey: "stok",
    // header: "Stok",
    header: () => {
      return ( <div className="w-3 text-center">Stok Barang</div>  )
    },
    cell: ({row}) => {
      return(
        <div className="text-center">
          {row.getValue("stok")}
        </div>
      )
    }
  },
  {
    accessorKey: "barcode",
    header: () => {
      return ( <div className="text-center">Barcode</div>  )
    },
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
          <Link href={`/produk/detail-produk/${id}`}>Detail</Link>
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
