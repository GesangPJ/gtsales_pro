
// API Data Kategori Produk
// Ambil dan Tambah kategori

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  try {
    const kategoris = await prisma.kategori.findMany({
      select: {
        id: true,
        nama: true,
      },
    })

    const hasil = kategoris.map((kategori) => ({
      id: kategori.id,
      nama_kategori: kategori.nama,
    }));

    return NextResponse.json(hasil, { status: 200 })
  } catch (error: unknown) {
    console.error("Data Kategori tidak dapat diambil", error)
    console.log("Data kategori tidak dapat diambil")

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data kategori" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest){

    try {
    const body = await req.json()
    const { nama_kategori } = body

    if (!nama_kategori) {
      return NextResponse.json(
        { error: "Nama kategori wajib diisi" },
        { status: 400 }
      )
    }

    const kategori = await prisma.kategori.create({
      data: {
        nama: nama_kategori,
      },
    })

    return NextResponse.json(kategori, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Gagal menyimpan kategori" },
      { status: 500 }
    )
  }
}


