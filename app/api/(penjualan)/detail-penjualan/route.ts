
// API ambil detail penjualan

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
        console.log("Parameter id kosong untuk detail penjualan!")
        return NextResponse.json({
            message:"Parameter id tidak boleh kosong!"
        }, {status: 400})
    }

    try{
        const detail_pembelian = await prisma.penjualan.findUnique({
            where:{id: parseInt(query)},
            include:{
                penjualandetail:{
                    select:{
                        id:true,
                        produkId:true,
                        jumlah:true,
                        harga:true,
                        total:true,
                        produk:{
                            select:{
                                nama:true,
                            },
                        },
                    },
                },
                user:{
                    select:{
                        name:true,
                    },
                },
            }
        })

        const hasil = {
            ...detail_pembelian,
            nama_kasir: detail_pembelian?.user.name,
            penjualandetail: detail_pembelian?.penjualandetail.map(detail => ({
                id: detail.id,
                produkId: detail.produkId,
                nama: detail.produk.nama,
                harga: detail.harga,
                jumlah: detail.jumlah,
                total: detail.total,
            }))
        }

        return NextResponse.json({
            success:true,
            message: "Detail Penjualan berhasil diambil!",
            data: hasil,
        }, { status: 200})

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}