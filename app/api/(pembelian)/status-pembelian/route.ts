
// API ambil status pembelian DIPESAN
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function GET(){

    try{
        const data_status = await prisma.pembelian.findMany({
            where:{status:"DIPESAN"},
            select:{
                id: true,
                kode: true,
                jumlahtotal:true,
                updatedAt: true,

            }
        })

        if(!data_status){
            return NextResponse.json({
                message:"Tidak ada Pembelian DIPESAN!"
            })
        }

        return NextResponse.json({
            data: data_status,
            message:"Berhasil mengambil data status pembelian"
        }, {status: 200})

    }catch(error){
        return NextResponse.json({
            success: false,
            message:"Gagal ambil status pembelian, server error"
        }, {status: 500})
    }
}



