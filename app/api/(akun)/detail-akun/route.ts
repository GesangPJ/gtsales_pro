
// API Detail Akun

import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if (!query){
        return NextResponse.json([], {status: 400})
    }


    try{
        const detail_akun = await prisma.user.findUnique({
            where:{id: query},
            select:{
                name:true,
                email:true,
                alamat:true,
                notelp:true,
                tipe:true,
                createdAt:true,
                updatedAt:true,
            }

        })

        if(!detail_akun){
            return NextResponse.json({
                success: false,
                message:"Data Akun tidak ditemukan!",
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            detail_akun,
            message:"Detail akun berhasil diambil"
        })

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })

    }
}


