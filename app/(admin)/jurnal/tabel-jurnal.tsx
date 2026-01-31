// Komponen Tabel Jurnal

import { columns, jurnalkolom } from "./kolom-jurnal"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { toast } from "sonner"

export default async function TabelJurnal(){

    let jurnal: jurnalkolom[] = []

    try{
        const respon = await fetch(`${baseUrl}/api/data-jurnal`,{
            next: {revalidate: 120}
        })

        if(!respon.ok){
            toast.error("Data Jurnal gagal diambil")
        }

        const hasil = await respon.json()
        jurnal = hasil.data

    }catch(error){
        console.error("Data Jurnal tidak dapat diambil")
    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={jurnal}
            />
        </div>
    )
}


