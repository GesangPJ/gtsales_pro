
// Komponen tampil data toko

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { baseUrl } from "@/lib/base-url"

export default async function K_DataToko(){

    let datatoko = null

    try{
        const respon = await fetch(`${baseUrl}/api/data-toko`,
            {next: {revalidate: 120}}
        )

        if(!respon){
            throw new Error("Data Toko Tidak ditemukan")
        }

        const hasil = await respon.json()
        datatoko = hasil.data_toko 


    }catch(error){

    }

    return(
        <Card className="bg-accent/50 border dark:bg-card dark:border-border dark:shadow-sm">
            <CardHeader>
                <CardTitle className="font-mono text-center text-xl warp-break-words hyphens-auto leading-relaxed">
                    Data Toko
                </CardTitle>
            </CardHeader>
            <CardContent className="font-mono space-y-2 mt-3 mb-5 text-lg">
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Nama</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.nama}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Email</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.email}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">No. Telpon</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.notelp}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Alamat Toko</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.alamat}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">NPWP</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.npwp}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">SIUP</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{datatoko.siup}</p>
                </div>
            </CardContent>
        </Card>
    )
}


