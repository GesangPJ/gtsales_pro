
// Halaman Detail produk

import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"

interface DetailProps{
    params: Promise<{id:string}>
}

export default async function HalamanDetailProduk({params}: DetailProps){

    const { id } = await params
    let produks = null

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    try{
        const respon = await fetch(`${baseUrl}/api/detail-produk?id=${id}`,{
            next: {revalidate: 60}
        })

        if(!respon){
            throw new Error("Data Produk Tidak ditemukan")
        }

        const hasil = await respon.json()
        produks = hasil.data

    }catch(error){
        console.error('Error:', error)
    }


    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="font-bold text-xl">Detail Produk : {id}</h1>
            </div>
            <div className="px-4 lg:px-6">
            <div className="space-y-2 mt-3 mb-5 text-xl">
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Nama Produk</p>
                    <p className="text-center">:</p>
                    <p>{produks.nama}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Barcode</p>
                    <p className="text-center">:</p>
                    <p>{produks.barcode}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Harga Jual</p>
                    <p className="text-center">:</p>
                    <p>Rp{parseInt(produks.harga_jual).toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Harga Beli</p>
                    <p className="text-center">:</p>
                    <p>Rp{parseInt(produks.harga_beli).toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Stok terbaru</p>
                    <p className="text-center">:</p>
                    <p>{parseInt(produks.stok)}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Kategori</p>
                    <p className="text-center">:</p>
                    <p>{produks.nama_kategori}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Jenis</p>
                    <p className="text-center">:</p>
                    <p>{produks.jenis}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Keterangan</p>
                    <p className="text-center">:</p>
                    <p>{produks.keterangan}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Ditambahkan</p>
                    <p className="text-center">:</p>
                    <p>{formatTanggal(produks.createdAt)}</p>
                </div>
            </div>
            <Button asChild size="lg" variant="outline" className="mt-3">
                  <Link href='/produk'>
                  <ArrowLeft size={32}/>
                  <p className="text-lg font-bold">Kembali</p></Link>
                </Button>
            </div>
        </div>
    )
}