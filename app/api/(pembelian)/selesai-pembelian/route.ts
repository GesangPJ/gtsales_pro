
// API Pembelian Selesai

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

export async function PUT(req: NextRequest ){

    try{

        const body = await req.json()

        const {id, userId} = body

        if(!id || !userId){
            return NextResponse.json({
                message: "ID dan userId wajib diisi!"
            }, {status: 400})
        }

         const pembelianId = parseInt(id)
         const idAkun = userId as string

        const result = await prisma.$transaction(
            async (tx) =>{
                // 1. Ambil data pembelian + detail + total
                const pembelian = await tx.pembelian.findUnique({
                where: { id: pembelianId },
                include: {
                    pembeliandetail: {
                    select: {
                        produkId: true,
                        jumlah: true,
                    }
                    }
                }
                })

                if (!pembelian) {
                throw new Error("Pembelian tidak ditemukan")
                }

                // 2. Update stok produk (+= jumlah)
                for (const detail of pembelian.pembeliandetail) {
                    await tx.produk.update({
                    where: { id: detail.produkId },
                    data: {
                        stok: {
                        increment: detail.jumlah
                        }
                    }
                    })
                }

                // 3. Update status pembelian
                const updatedPembelian = await tx.pembelian.update({
                    where: { id: pembelianId },
                    data: {
                    status: "SELESAI",
                    userId:idAkun,
                    },
                    include: {
                    pembeliandetail: true,
                    }
                })

                // 4. Buat jurnal pembelian
                await tx.jurnal.createMany({
                    data: [
                        // TRANSFER: Barang masuk, Rekening bank keluar
                        {
                        kode: pembelian.kode,
                        akun: "PEMBELIAN",  // Barang bertambah
                        debit: pembelian.jumlahtotal,
                        kredit: new Prisma.Decimal(0),
                        keterangan: `Pembelian barang via transfer bank ${pembelian.kode}`,
                        sumber: "TRANSFER",
                        userId: userId
                        },
                        {
                        kode: pembelian.kode,
                        akun: "BANK",
                        debit: new Prisma.Decimal(0),
                        kredit: pembelian.jumlahtotal,
                        keterangan: `Pembayaran transfer bank ${pembelian.kode}`,
                        sumber: "TRANSFER",
                        userId: userId
                        }
                    ]
                    })

      return updatedPembelian
    })

    return NextResponse.json({
      success: true,
      message: "Status pembelian berhasil diupdate & stok + jurnal tercatat",
      data: result
    })

  } catch (error: any) {
    console.error("Update status pembelian error:", error)
    return NextResponse.json({
      success: false,
      message: error.message || "Terjadi kesalahan server"
    }, { status: 500 })
  }
}

