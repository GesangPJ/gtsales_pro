// Komponen tabel kategori barang

import { columns, Kategori } from "./column"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"

export default async function TabelKategori() {

    let kategoris: Kategori[] = []
    
    try {
      const res = await fetch(`${baseUrl}/api/data-kategori`, {
        next: { revalidate: 3600 }, // Revalidate setiap X detik
      })
      
      if (!res.ok) {       
        throw new Error('Gagal ambil data kategori')
      }    
      kategoris = await res.json()
    } catch (error) {
      console.error("Data Kategori tidak dapat diambil dari API", error)
    }

    return(
        <div>
          <div className="">
            <DataTable
            columns={columns}
            data={kategoris}
            />
          </div>
        </div>
    )
}


