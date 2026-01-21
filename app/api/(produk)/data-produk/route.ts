
// API data produk

// Ambil dan buat data produk

import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"


export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {nama_produk,
               hargajual,
               hargabeli,
               idkategori,
               stokbarang,
               barcodebarang,
               keterangan,
               jenisproduk,
        } = body

    if (!nama_produk || !hargabeli || !hargajual) {
      return NextResponse.json(
        { error: "Ada data yang kosong!" },
        { status: 400 }
      )
    }

    const harga_beli = parseInt(hargabeli as string)
    const harga_jual = parseInt(hargajual as string)
    const kategoriId = parseInt(idkategori as any)
    const stok = parseInt(stokbarang)
    const barcode = barcodebarang as string
    const jenis = jenisproduk as string

    const tambahProduk = await prisma.produk.create({
        data:{
            nama:nama_produk,
            harga_beli,
            harga_jual,
            stok,
            keterangan,
            jenis,
            kategoriId,
            barcode,

        },
    })

    console.log("Produk berhasil disimpan di DB")

    return NextResponse.json({
        success:true,
        tambahProduk,
        message:"Produk berhasil disimpan di DB"
    }, {status:201})


    }catch(error){
        console.error(error)
        return NextResponse.json(
        { error: "Gagal menyimpan data barang" },
        { status: 500 }
        )
    }
}

// Ambil daftar produk

export async function GET(_req: NextRequest){

    try{
        const data_produk = await prisma.produk.findMany({
            select:{
                id:true,
                nama:true,
                stok:true,
                harga_beli:true,
                harga_jual:true,
                kategoriId:true,
                barcode:true,
                kategori:{
                    select:{
                        nama:true,
                    }
                }
            }
        })

        if(!data_produk){
            throw new Error("Data produk kosong!")
        }

        const hasil = data_produk.map((produk)=>({
            ...produk,
            nama_kategori: produk.kategori?.nama || null,
        }))

        return NextResponse.json({
            success:true,
            message:"Daftar produk berhasil diambil!",
            data: hasil,
        }, {status: 200})

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })

    }
}


