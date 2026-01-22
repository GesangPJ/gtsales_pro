
// Komponen Tabel Akun

import {columns, Akun} from "./kolom-akun"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"


export default async function TabelAkun(){

    let akuns: Akun[] = []

    try{

        const respon = await fetch(`${baseUrl}/api/data-akun`,{
            next: {revalidate: 120},
        })

        if(!respon.ok){
            throw new Error("Data Akun gagal diambil")
        }

        const hasil = await respon.json()
        akuns = hasil.data_akun


    }catch(error){
        console.error("Data Akun tidak dapat diambil dari API", error)

    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={akuns}/>
        </div>
    )
}


