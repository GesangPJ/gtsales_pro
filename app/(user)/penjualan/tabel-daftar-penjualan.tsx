
// Tabel Data Pembelian

import { DataTable } from "@/components/data-table"
import { Penjualan, columns } from "./kolom-daftar-penjualan"
import { baseUrl } from "@/lib/base-url"


export default async function TabelPenjualan(){

    let data: Penjualan[] = []

    try{
        const res = await fetch(`${baseUrl}/api/transaksi-penjualan`, 
            {next: {revalidate: 120} })

        if(!res.ok){
            throw new Error(`Gagal ambil data penjualan`)
        }

        const status_p = await res.json()
        data = status_p.data || []

    
    }catch(error){

    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={data}
            />
        </div>
    )
}


