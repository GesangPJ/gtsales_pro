
// API ambil data toko

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { success } from "zod"

export async function GET(_req: NextRequest){

    try{
        const data_toko = await prisma.toko.findFirst({
            select:{
                nama:true,
                email:true,
                alamat:true,
                notelp:true,
                siup:true,
                npwp:true,
            }
        })

        if(!data_toko){
            console.log(`Data Toko Kosong!`)
            return NextResponse.json({
                success:false,
                message:"Data Toko Kosong!"
            }, {status: 400})
        }

        return NextResponse.json({
            success:true,
            data_toko,
            message:"Data Toko Berhasil diambil!"
        }, {status: 200})

    }catch(error){

    }
}





