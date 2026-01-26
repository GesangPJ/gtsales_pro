
// API Cari Distributor berdasarkan nama

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams.get('q')

    if(!query || query.length < 2){
        return NextResponse.json([], {status:400})
    }

    try{
        const distributors = await prisma.distributor.findMany({
            where:{
                nama:{
                    contains: query,
                }
            },
            select:{
                id:true,
                nama:true,
            }
        })

        return NextResponse.json(distributors, {status: 200})


    }catch(error: unknown){
        console.error("Data Produk tidak dapat diambil", error)
        return NextResponse.json(
        { error: "Terjadi kesalahan saat mengambil data produk" },
        { status: 500 }
        )

    }
}
