
// API Data Distributor

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(_req: NextRequest){

    try{
        const data_distributor = await prisma.distributor.findMany({
            select:{
                id: true,
                nama:true,
                email:true,
                alamat:true,
                notelp:true,
                keterangan:true,
            }
        })

        if(!data_distributor){
            console.log("Data Distributor Kosong!")
            return NextResponse.json({
                success:false,
                message:"Data Distributor Kosong"
            }, {status: 400})
        }

        console.log("Data Distributor berhasil diambil")
        return NextResponse.json({
            success:true,
            message:"Data Distributor berhasil dikirim",
            data_distributor,
        }, {status: 200})

    }catch(error){
        console.error("ERROR API DISTRIBUTOR", error)
        return NextResponse.json({
            success: false,
            message: "API Distributor Error",
        }, {status: 500})
    }

}

// Tambah data distributor

export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {nama, email, alamat, notelp, keterangan} = body

        if(!nama){
            return NextResponse.json({
                error: "Nama Distributor tidak boleh kosong!"
            }, {status: 400})
        }

        const tambahdistributor = await prisma.distributor.create({
            data:{
                nama,
                email,
                alamat,
                notelp,
                keterangan,
            },
        })

        console.log(`Data distributor ${nama} berhasil disimpan!`, tambahdistributor)

        return NextResponse.json({
            success: true,
            message: `Data Distributor ${nama} berhasil disimpan`
        }, {status: 201})

    }catch(error){
        console.error(error)
        return NextResponse.json(
        { error: "Gagal menyimpan data distributor" },
        { status: 500 }
        )
    }

}

// Edit Data Distributor

export async function PUT(req: NextResponse){

    try{
        const body = await req.json()

        const { id, nama, email, alamat, notelp, keterangan}=body

        if(!id){
            console.log(`ID dan Nama distributor tidak boleh kosong`)

            return NextResponse.json({
                success: false,
                message: "ID dan Nama distributor tidak boleh kosong",
            }, {status: 400})
        }

        const edit_distributor = await prisma.distributor.update({
            where:{id:id},
            data:{
                nama,
                email,
                alamat, 
                notelp,
                keterangan,
            }
        })

        console.log(`Distributor ${id} berhasil diupdate`)

        return NextResponse.json({
            success: true,
            edit_distributor,
            message: "Distributor berhasil diupdate"
        }, {status: 200})

    }catch(error){
        console.error(error)
        return NextResponse.json(
        { error: "Gagal mengubah data distributor" },
        { status: 500 }
        )
    }


}





