
// Komponen Tabel Distributor

import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { Distributor, columns } from "./kolom-distributor"
import {toast} from "sonner"

export default async function TabelDistributor(){

    let distributor: Distributor[] = []

    try{

        const respon = await fetch(`${baseUrl}/api/data-distributor`,{
            next:{revalidate: 300}
        })

        if(!respon.ok){
            toast.error("Gagal ambil data Distributor")
        }

        const hasil = await respon.json()
        distributor = hasil.data_distributor

    }catch(error){

    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={distributor}/>
        </div>
    )
}



