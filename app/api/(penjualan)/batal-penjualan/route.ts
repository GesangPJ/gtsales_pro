
// API ubah status penjualan ke BATAL
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest){

    try{
        const body = await req.json()

        const { idpenjualan, userId, produk} = body

        const hasil = await prisma.$transaction(async (tx) =>{

            // Ganti status ke BATAL
            await tx.penjualan.update({
                where:{id: parseInt(idpenjualan)},
                data:{
                    status:"BATAL",
                    userId,
                }
            })

            // Ambil daftar produk dan jumlahnya
            const penjualan = await tx.penjualan.findUnique({
                where:{id: idpenjualan},
                select:{
                    kode:true,
                    jumlahtotal:true,
                    penjualandetail:{
                        select:{
                            produkId:true,
                            jumlah:true,
                        }
                    }
                }
            })

            if(!penjualan){
            throw new Error("Penjualan tidak ditemukan")
            }

            // Update stok produk sesuai produk penjualan
            for (const detail of penjualan.penjualandetail) {
                await tx.produk.update({
                    where:{id: detail.produkId},
                    data:{
                        stok:{
                            increment: detail.jumlah
                        },
                    },
                })
            }

            const totalPenjualan = penjualan?.jumlahtotal || 0

            // 4. Membuat Jurnal Pembalik dimana :
            // Debit: Return Penjualan (kurangi pendapatan)
            // Kredit: Kas (asumsikan Tunai)
            // Atur HPP nanti
            await tx.jurnal.createMany({
                data: [
                {
                    kode: penjualan?.kode,
                    akun: "RETURN_PENJUALAN",
                    userId,
                    debit: totalPenjualan,
                    kredit: 0,
                    keterangan: "Pembalikan penjualan yang batal"
                },
                {
                    kode: penjualan?.kode,
                    akun: "KAS",
                    userId,
                    debit: 0,
                    kredit: totalPenjualan,
                    keterangan: "Pembalikan penjualan yang batal"
                }
                ]
            })
        })

        return NextResponse.json({
            message: "Data penjualan berhasil diubah ke BATAL, stok produk telah dikembalikan, dan jurnal sudah diubah"
        }, {status: 201})

    }catch(error: any){
        console.error("Update status pembelian error:", error)
        return NextResponse.json({
        success: false,
        message: error.message || "Terjadi kesalahan server"
        }, { status: 500 })
    }
}

