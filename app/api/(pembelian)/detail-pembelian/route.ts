
// API ambil detail pembelian

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
        console.log("Parameter id kosong untuk detail pembelian!")
        return NextResponse.json({
            message:"Parameter id tidak boleh kosong!"
        }, {status: 400})
    }

    try{
        const detail_pembelian = await prisma.pembelian.findUnique({
            where:{id: parseInt(query)},
            include:{
                pembeliandetail:{
                    select:{
                        id:true,
                        produkId:true,
                        jumlah:true,
                        harga:true,
                        total:true,
                        produk:{
                            select:{
                                nama:true,
                            },
                        },
                    },
                },
                user:{
                    select:{
                        name:true,
                    },
                },
                distributor:{
                    select:{
                        nama:true,
                    }
                }
            }
        })

        const hasil = {
            ...detail_pembelian,
            nama_user: detail_pembelian?.user.name,
            nama_distributor: detail_pembelian?.distributor?.nama,
            pembeliandetail: detail_pembelian?.pembeliandetail.map(detail => ({
                id: detail.id,
                produkId: detail.produkId,
                nama_produk: detail.produk.nama,
                harga_beli: detail.harga,
                jumlah: detail.jumlah,
                total: detail.total,
            }))
        }

        return NextResponse.json({
            success:true,
            message: "Detail Pembelian berhasil diambil!",
            data: hasil,
        }, { status: 200})

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }




}


