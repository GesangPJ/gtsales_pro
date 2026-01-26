
// Tabel Data Pembelian

import { DataTable } from "@/components/data-table"
import { Pembelian, columns } from "./kolom-tabel-pembelian"
import { baseUrl } from "@/lib/base-url"


export default async function TabelPembelian(){

    let data_pembelian: Pembelian[] = []

    try{
        const res = await fetch(`${baseUrl}/api/transaksi-pembelian`, 
            {next: {revalidate: 120} })

        if(!res.ok){
            throw new Error(`Gagal ambil data pembelian`)
        }

        const status_p = await res.json()
        data_pembelian = status_p.data || []

    
    }catch(error){

    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={data_pembelian}
            />
        </div>
    )
}


