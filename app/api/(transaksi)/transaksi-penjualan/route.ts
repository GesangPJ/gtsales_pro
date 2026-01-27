
// API Transaksi Penjualan Produk

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {
            userId, produk, metode, diskon, jumlahtotal
        } = body

        if(!produk || produk.length ===0){
            return NextResponse.json({
                error: "Data produk kosong!"
            }, {status: 400})
        }

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.penjualan.findFirst({
        where: {
            createdAt: {
            gte: new Date(tahun, kalender.getMonth(), 1),
            lte: new Date(tahun, kalender.getMonth() + 1, 0),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        })

        let newNumber = '00001'

        // Reset nomor seri jika masuk bulan baru

        if (lastPembelian && lastPembelian.kode) {
        // Cek bulan sama
        const lastDate = new Date(lastPembelian.createdAt)
        const lastBulan = monthNames[lastDate.getMonth()]
        const lastTahun = lastDate.getFullYear()
        
            if (bulan === lastBulan && tahun === lastTahun) {
                // Extract angka 5 digit dari kode, contoh : (GT/PURCHASE/2026/JAN/00001)
                const match = lastPembelian.kode.match(/\/(\d{5})$/)  // ✅ Regex safe
                
                if (match) {
                const lastNumber = parseInt(match[1], 10)  // 00001 → 1
                    if (!isNaN(lastNumber)) {
                        newNumber = (lastNumber + 1).toString().padStart(5, '0')  // 00002
                    }
                }
            }
        }
        const kode_penjualan = `GT/SALES/${tahun}/${bulan}/${newNumber}`

        const hasil_transaksi = await prisma.$transaction(async (tx)=>{

            // 1. Mmebuat transaksi penjualan
            const transaksi_penjualan = await tx.penjualan.create({
                data:{
                    kode: kode_penjualan,
                    userId,
                    status:"SELESAI",
                    metode,
                    diskon,
                    jumlahtotal,
                    penjualandetail:{
                        create: produk.map((produk: any)=>({
                            produkId: produk.id,
                            jumlah: produk.jumlah,
                            harga: produk.harga,
                            total: produk.jumlah * produk.harga,
                        })),
                    }

                }
            })

            // 2. Mengurangi stok produk berdasarkan produk yang dibeli
            for (const item of produk){
                await tx.produk.update({
                    where:{id: item.id},
                    data:{
                        stok:{
                            decrement: parseInt(item.jumlah)
                        }
                    }
                })
            }

            // 3. Membuat Jurnal Penjualan
            await tx.jurnal.createMany({
                data:[
                       // Uang masuk : Debit
                    {
                        kode: transaksi_penjualan.kode,
                        akun: "KAS",
                        debit: transaksi_penjualan.jumlahtotal,
                        kredit: new Prisma.Decimal(0),
                        userId: userId,
                        sumber: transaksi_penjualan.metode,
                        keterangan: `Penjualan produk ${transaksi_penjualan.kode} dengan pembayaran via ${transaksi_penjualan.metode}`,
                    },
                        // PENJUALAN : KREDIT (pendapatan)
                    {
                        kode: transaksi_penjualan.kode,
                        akun: "PENJUALAN",
                        debit: new Prisma.Decimal(0),
                        kredit: transaksi_penjualan.jumlahtotal,
                        userId: userId,
                        sumber: transaksi_penjualan.metode,
                        keterangan: `Penjualan produk ${transaksi_penjualan.kode} dengan pembayaran via ${transaksi_penjualan.metode}`,
                    }
                ]
            })

            return transaksi_penjualan
        })

        return NextResponse.json({
            success: true,
            message: "Transaksi Penjualan berhasil dibuat!",
            data: hasil_transaksi,
        }, {status: 201})

    }catch(error: any){
        console.error("Error membuat transaksi penjualan", error)
        return NextResponse.json({
            success: false,
            message: error.message || "Kesalahan server"
        }, {status: 500})
    }
}

// Ambil data transaksi penjualan

export async function GET(_req: NextRequest){
    try{

        const data_penjualan = await prisma.penjualan.findMany({
            where:{status:"SELESAI"},
            select:{
                id:true,
                kode:true,
                updatedAt:true,
                metode:true,
                diskon:true,
                jumlahtotal:true,
            },
        })

        if(!data_penjualan || data_penjualan.length === 0){
            return NextResponse.json({
                success:false,
                message: "Data penjualan kosong!"
            }, {status: 404})

        }

        return NextResponse.json({
            message: "Data Penjualan berhasil dikirim",
            data: data_penjualan,
        }, {status: 200})


    }catch(error: any){
        console.error("Error mengambil transaksi penjualan", error)
        return NextResponse.json({
            success: false,
            message: error.message || "Kesalahan server"
        }, {status: 500})
    }
}


