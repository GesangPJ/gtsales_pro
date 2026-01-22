
// API ambil detail produk

import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function GET(req: NextRequest ){
    const query = req.nextUrl.searchParams.get('id')

    if(!query){
        return NextResponse.json([], {status: 400})
    }

    try{
        const detail_produk = await prisma.produk.findUnique({
            where:{ id: parseInt(query)},
            select:{
                id:true,
                nama:true,
                stok:true,
                harga_beli:true,
                harga_jual:true,
                kategoriId:true,
                keterangan:true,
                createdAt:true,
                updatedAt:true,
                jenis:true,
                barcode:true,
                kategori:{
                    select:{
                        nama:true,
                    }
                }
            }
        })

        if(!detail_produk){
            throw new Error(`Detail produk tidak ditemukan`)
        }

        const hasil = {
        ...detail_produk,
        nama_kategori: detail_produk.kategori?.nama || null,  // ✅ No map!
        }

        return NextResponse.json(
            {
                success:true,
                message:"Detail produk berhasil diambil",
                data: hasil,
            }, {status:200}
        )

       

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

}


