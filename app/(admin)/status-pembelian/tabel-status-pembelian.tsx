// Tabel menampilkan status pembelian "DIPESAN"
import { baseUrl } from "@/lib/base-url"
import { DataTable } from "@/components/data-table"
import { Pembelian, columns } from "./kolom-status-pembelian"

export default async function TabelStatusPembelian(){

    let status_pembelian: Pembelian[] = []

    try{
        const respon = await fetch(`${baseUrl}/api/status-pembelian`,{
            next: {revalidate: 120}
        })

        if(!respon.ok){
            throw new Error("Gagal ambil status pembelian")
        }

        const hasil = await respon.json()
        status_pembelian = hasil.data


    }catch(error){

    }

    return(
    <div>
        <DataTable
        columns={columns}
        data={status_pembelian}
        />
    </div>
    )
}



