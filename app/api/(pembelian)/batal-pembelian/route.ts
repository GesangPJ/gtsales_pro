
// API Status pembelian Batal

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest){

    try{
        const body = await req.json()

        const { id, userId} = body

        if(!id || !userId) {
            return NextResponse.json({
                message:"ID dan userId kosong!"
            }, {status: 400})
        }

        const pembelianId = parseInt(id)
        const idAkun = userId as string

        const hasil = await prisma.pembelian.update({
            where:{id: pembelianId},
            data:{
                userId: idAkun,
                status: "BATAL",
            },
        })

        return NextResponse.json({
            message:"Pembelian berhasil dibatalkan!"
        }, {status: 200})


    }catch(error: any){
        console.error("Update status pembelian error:", error)
        return NextResponse.json({
        success: false,
        message: error.message || "Terjadi kesalahan server"
        }, { status: 500 })
    }
}
