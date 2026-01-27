
// Halaman Detail Penjualan
import { baseUrl } from "@/lib/base-url"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {columns} from "./kolom-detail"
import { DataTable } from "@/components/data-table"
import { formatTanggalJam } from "@/lib/formattanggal"

interface DetailProps{
    params: Promise<{id:string}>
}

export default async function DetailPenjualan({params}: DetailProps){

    const {id} = await params

    let details = null
    let detailProduk = []

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    try{
        const respon = await fetch(`${baseUrl}/api/detail-penjualan?id=${id}`,{
            next: {revalidate: 120}
        })

        if(!respon){
            throw new Error("Detail penjualan tidak ditemukan!")
        }

        const hasil = await respon.json()
        details = hasil.data
        detailProduk = details?.penjualandetail || []

    }catch(error){
        console.error('Error:', error)
    }

    return(
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6 font-mono">
                    <h1 className="text-xl font-bold">Detail Penjualan : {details.kode}</h1>
                    <div className="space-y-2 mt-3 mb-5">
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-32">Update</p>
                            <p className="text-center">:</p>
                            <p>{formatTanggalJam(details.createdAt)}</p>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-32">Status</p>
                            <p className="text-center">:</p>
                            <p>{details.status}</p>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-32">Akun</p>
                            <p className="text-center">:</p>
                            <p>{details.nama_kasir}</p>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-32">Diskon</p>
                            <p className="text-center">:</p>
                            <p>{formatRupiah(details.diskon)}</p>
                        </div>

                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-32">Jumlah Total</p>
                            <p className="text-center">:</p>
                            <p>{formatRupiah(details.jumlahtotal)}</p>
                        </div>
                    </div>
    
                    <h1 className="text-2xl font-bold my-7">Tabel Produk :</h1>
                    
                    <div className="mt-3">
                      <DataTable
                      columns={columns}
                      data={detailProduk}
                      />
                      
                    </div>
    
                    <Button asChild size="lg"  className="mt-3 bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40">
                      <Link href='/penjualan'>
                      <ArrowLeft/>
                      Kembali</Link>
                    </Button>
                  </div>
                </div>
        )




}