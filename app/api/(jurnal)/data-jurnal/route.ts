
// API Data Jurnal
// Ambil, membuat, update Jurnal

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){

    try{

        const data_jurnal = await prisma.jurnal.findMany({
            select:{
                kode:true,
                akun:true,
                debit:true,
                kredit:true,
                sumber:true,
                updatedAt:true,
            }
        })

        if(!data_jurnal){
            console.log("Data Jurnal Kosong!")
            return NextResponse.json({
                success:true,
                message:"Data Jurnal berhasil diambil",
                data: data_jurnal,
            }, {status: 200})
        }

    }catch(error: any){
        console.error("Error API data-jurnal", error)
        return NextResponse.json({
            message:"Error Server Data Jurnal"
        }, {status: 500})

    }

}

export async function PUT(req: NextRequest){

    const body =  await req.json()

    const {
        idjurnal,
        userId,
        kode,
        akun,
        debit,
        kredit,
        keterangan,
        sumber,
    } = body

    try{

        const update_jurnal = await prisma.jurnal.update({
            where:{id:parseInt(idjurnal)},
            data:{
                userId,
                kode,
                akun,
                debit,
                kredit,
                keterangan,
                sumber,
            }
        })

    }catch(error: any){

    }
}

