
// Komponen detail akun login

import { auth } from '@/lib/auth'
import { headers } from "next/headers"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function KomponenAkun(){

    const session = await auth.api.getSession({
        headers: await headers(),
      })

    const nama = session?.user?.name
    const email = session?.user?.email
    const notelp = session?.user?.notelp ?? "-"
    const alamat = session?.user?.alamat ?? "-"

    return(
        <Card>
            <CardHeader>
                <CardTitle className="font-mono text-center text-xl warp-break-words hyphens-auto leading-relaxed">
                    Detail Akun
                </CardTitle>
            </CardHeader>
            <CardContent className="font-mono space-y-2 mt-3 mb-5 text-lg">
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Nama Akun</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{nama}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Email Akun</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{email}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">No.telpon Akun</p>
                    <p className="text-center">:</p>
                    <p>{notelp}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-40">Alamat Akun</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{alamat}</p>
                </div>
            </CardContent>
        </Card>
    )
}





