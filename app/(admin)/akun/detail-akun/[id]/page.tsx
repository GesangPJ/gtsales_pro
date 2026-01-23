// Halaman Detail Akun

import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DetailProps{
    params: Promise<{id:string}>
}

export default async function HalamanDetailAkun({params}: DetailProps){

    const {id} = await params

    let akuns = null

    try{
        const respon = await fetch(`${baseUrl}/api/detail-akun?id=${id}`,{
            next: {revalidate: 120}
        })

        if(!respon){
            throw new Error("Data Akun Tidak ditemukan")
        }

        const hasil = await respon.json()
        akuns = hasil.detail_akun

    }catch(error){

    }


    return(
        
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Detail Akun : {akuns.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 mt-3 mb-5 text-xl">
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Nama</p>
                        <p className="text-center">:</p>
                        <p>{akuns.name}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Email</p>
                        <p className="text-center">:</p>
                        <p>{akuns.email}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Alamat</p>
                        <p className="text-center">:</p>
                        <p>{akuns.alamat}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Notelp</p>
                        <p className="text-center">:</p>
                        <p>{akuns.notelp}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Tipe</p>
                        <p className="text-center">:</p>
                        <p>{akuns.tipe}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-40">Dibuat</p>
                        <p className="text-center">:</p>
                        <p>{formatTanggal(akuns.createdAt)}</p>
                    </div>
                
                    <Button asChild size="lg" variant="outline" className="mt-3">
                        <Link href='/akun'>
                        <ArrowLeft size={32}/>
                        <p className="text-lg font-bold">Kembali</p></Link>
                    </Button>
                    </div>
                    </CardContent>
                </Card>
            </div>
                
        </div>
    )
}


