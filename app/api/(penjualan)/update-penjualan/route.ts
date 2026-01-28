
// API update data penjualan

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest){

    try{
        const body = await req.json()

        const {
            userId,
            idpenjualan,
            produk,
            status,
            jumlahtotal,
        } = body

        // Update data penjualan menggunakan sistem transaksi
       await prisma.$transaction(async (tx) => {

            // update tabel penjualan
            await tx.penjualan.update({
                where: { id: parseInt(idpenjualan) },
                data: {
                status,
                jumlahtotal,
                userId
                }
            })

            // Update tabel penjualandetail
            for (const prod of produk) {
                await tx.penjualanDetail.updateMany({
                where: {
                    penjualanId: parseInt(idpenjualan),
                    produkId: prod.id
                },
                data: {
                    jumlah: prod.jumlah,
                    harga: prod.harga,
                    total: prod.jumlah * prod.harga
                }
                })
            }
        })

        return NextResponse.json({
            message:"Perubahan penjualan berhasil disimpan"
        }, {status: 201})

    }catch(error: any){
        console.error("Error mengubah transaksi penjualan", error)
        return NextResponse.json({
            success: false,
            message: error.message || "Kesalahan server"
        }, {status: 500})
    }
}

