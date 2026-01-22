
// API ambil data Akun

import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function GET(_req: NextRequest){

    try{
        
        const data_akun = await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                tipe:true,
            }
        })

        if(!data_akun){
            console.log("Tabel Akun Kosong!")
            return NextResponse.json({
                success: false,
                message:"Tabel Akun Kosong"
            }, {status: 400})
        }

        console.log("Data Akun berhasil diambil!")
        return NextResponse.json({
            success:true,
            data_akun,
            message:"Data akun berhasil diambil!"
        }, {status: 200})


    }catch(error){
        console.error(error)
        return NextResponse.json(
        { error: "Gagal menyimpan data barang" },
        { status: 500 }
        )
    }
}



