// Komponen Menampilkan tabel data produk

import { columns } from "./kolom-produk"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"

type Kategori = {
  id: number
  nama_kategori: string
}

type Produk = {
  id: number
  nama_produk: string,
  harga_jual: number,
  harga_beli: number,
  kategoriId: number,
  namaKategori?: string,
  stok: number,
  jenis: string,
  barcode: number,
}

export default async function TabelProduk(){
    //${process.env.NEXT_PUBLIC_BASE_URL}
    let produks : Produk[] = []
    let kategoris: Kategori[] = []

    try{
        const [respon1, respon2] = await Promise.all([
            fetch(`${baseUrl}/api/data-kategori`),
            fetch(`${baseUrl}/api/data-produk`)

        ])

        if(!respon1.ok || !respon2.ok) throw new Error('Gagal mengambil data produk dan kategori')

        kategoris = await respon1.json()
        const dataproduk = await respon2.json()

        produks = dataproduk.data || []

        // Mapping kategoriId → nama_kategori
        const kategoriMap = new Map(kategoris.map(k => [k.id, k.nama_kategori]))
        
        produks = produks.map(produk => ({
        ...produk,
        namaKategori: kategoriMap.get(produk.kategoriId) || 'Tidak ada Kategori'
        }))

    }catch (error){
        console.error('Error saat mengambil data', error)
    }

    return(

        <div>
            <div>
                <DataTable
                columns={columns}
                data={produks}
                />
            </div>

        </div>
    )
}



