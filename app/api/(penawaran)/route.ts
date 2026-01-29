
// API membuat dan mengambil data penawaran penjualan

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { profile } from "node:console"

export async function POST(req: NextRequest){

    try{

        const body = await req.json()

        const {
            userId,
            produk,
            nama_pelanggan,
            email_pelanggan,
            alamat_pelanggan,
            keterangan,
            metode,
            jumlahtotal,
            diskon,

        } = body

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.penawaranPenjualan.findFirst({
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
        const kode_penawaran = `GT/QUOTE/${tahun}/${bulan}/${newNumber}`

        const hasil = await prisma.$transaction(async (tx)=>{

            await tx.penawaranPenjualan.create({
                data:{
                    userId,
                    kode: kode_penawaran,
                    metode,
                    diskon,
                    keterangan,
                    nama_pelanggan,
                    email_pelanggan,
                    alamat_pelanggan,
                    jumlahtotal,
                    detailpenawaranpenjualan:{
                        create: produk.map((produk: any)=>({
                            produkId: produk.id,
                            jumlah: produk.jumlah,
                            harga: produk.harga,
                            total: produk.jumlah * produk.harga,
                        }))
                    }
                }
            })
        })

    }catch(error){

    }
}

