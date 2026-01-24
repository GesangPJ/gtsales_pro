
// API Update data akun

import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"


export async function PUT(req:NextRequest){

    try{
        const body  = await req.json()

        const {
            id,
            name,
            email,
            alamat,
            notelp,
            tipeakun,
        } = body

        if(!id){
            console.log(`Data ID Kosong!`)
            return NextResponse.json({
                success: false,
                message:"Data ID Akun Kosong!"}, {status: 400})
        }

        const cekuser = await prisma.user.findUnique({
            where:{id:id as string},

        })

        if(!cekuser){
            console.log(`Akun dengan ID : ${id} tidak ditemukan!`)
            return NextResponse.json({
                success:false,
                message:"ID Akun tidak ditemukan!",},
                {status:404})
        }

        const UpdateUser = await prisma.user.update({
            where:{id:id,},
            data:{
                name,
                alamat,
                email,
                notelp,
                tipe:tipeakun,
            }
        })

        console.log(`User ${id} diupdate`)
        return NextResponse.json(
            {
                success: true,
                UpdateUser,
                message: "Akun berhasil diupdate!"
            },{status: 200}
        )

        }catch(error){
            console.error("Update error:", error)
            return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
            )
        }
}






