
// API Data Pembelian Produk

import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

// Ambil dan Buat Pembelian Produk

// Ambil Pembelian

export async function GET(_req: NextRequest){

    try{
        const data_pembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode:true,
                status:true,
                distributorId:true,
                jumlahtotal:true,
                metode:true,
                createdAt:true,
                updatedAt:true,
                distributor:{
                    select:{
                        nama:true,
                    },
                },
            },
        })

        if(!data_pembelian){
            throw new Error(`Data pembelian tidak ditemukan`)
        }

        const hasil = data_pembelian.map((pembelian) => ({
            ...pembelian,
            nama_distributor: pembelian.distributor?.nama || null,
        }))

        return NextResponse.json({success: true, data:hasil}, {status:200})

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

// Buat transaksi pembelian produk

export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {
            distributorId,
            userId,
            produk,
            metode,
            totalharga,
            biayakirim
        } = body

        if(!produk || produk.length === 0){
            console.log(`Data produk kosong di API pembelian`)
            return NextResponse.json({ error: "Data Produk Kosong!" }, { status: 400 })
        }

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.pembelian.findFirst({
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
        const kode_pembelian = `GT/PURCHASE/${tahun}/${bulan}/${newNumber}`

        const buatpembelian = await prisma.pembelian.create({
            data:{
                kode:kode_pembelian,
                distributorId,
                userId,
                metode,
                biayakirim,
                status:"DIPESAN",
                jumlahtotal:parseInt(totalharga),
                pembeliandetail:{
                    create: produk.map((produk:any)=>({
                        produkId: produk.id,
                        jumlah: produk.jumlah,
                        harga: produk.harga_beli,
                        total: produk.jumlah * produk.harga_beli,
                    })),

                }
            }
        })

        return NextResponse.json(
                { 
                    success: true, 
                    data: buatpembelian, 
                    message: "Pembelian berhasil dibuat" 
                }, 
                { status: 201 })

    }catch(error){
        console.error("Error membuat pembelian", error)
        return NextResponse.json(
        { error: "Gagal membuat pembelian" }, 
        { status: 500 }
        )
    }


}



