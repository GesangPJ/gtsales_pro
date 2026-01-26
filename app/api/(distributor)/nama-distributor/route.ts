
// API ambil nama distributor

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){

    try{
        const distributor = await prisma.distributor.findMany({
            select:{
                id:true,
                nama:true,
            }
        })

        if(!distributor){
            return NextResponse.json({
                message:"Data distributor Kosong!"
            }, {status: 400})
        }

        return NextResponse.json(distributor, {status: 200})

    }catch(error){

    }
}



