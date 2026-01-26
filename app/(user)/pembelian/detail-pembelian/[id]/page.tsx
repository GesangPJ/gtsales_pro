
// Halaman detail pembelian
import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {columns} from "./kolom-detail"
import { DataTable } from "@/components/data-table"


interface DetailProps{
    params: Promise<{id:string}>
}

export default async function HalamanDetailPembelian({params}: DetailProps){

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
        const respon = await fetch(`${baseUrl}/api/detail-pembelian?id=${id}`,{
            next: {revalidate: 120}
        })

        if(!respon){
            throw new Error("Detail pembelian tidak ditemukan!")
        }

        const hasil = await respon.json()
        details = hasil.data
        detailProduk = details?.pembeliandetail || []



    }catch(error){
        console.error('Error:', error)
    }


    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6 font-mono">
                <h1 className="text-xl font-bold">Detail Pembelian : {details.kode}</h1>
                <div className="space-y-2 mt-3 mb-5">
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Tanggal</p>
                        <p className="text-center">:</p>
                        <p>{formatTanggal(details.createdAt)}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Status</p>
                        <p className="text-center">:</p>
                        <p>{details.status}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Akun</p>
                        <p className="text-center">:</p>
                        <p>{details.nama_user}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Distributor</p>
                        <p className="text-center">:</p>
                        <p>{details.nama_distributor || "-"} </p>
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

                <Button asChild size="lg" variant="default" className="mt-3">
                  <Link href='/pembelian/data-pembelian'>
                  <ArrowLeft/>
                  Kembali</Link>
                </Button>
              </div>
            </div>
    )
}



