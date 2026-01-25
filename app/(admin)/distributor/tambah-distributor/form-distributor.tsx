
// Form Tambah Distributor
'use client'
import { useState, useRef } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupTextarea, } from "@/components/ui/input-group"

import {CirclePlus, Loader2} from "lucide-react"
import { baseUrl } from '@/lib/base-url'



export default function FormTambahDistributor(){
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const maxLength = 150
    const remaining = maxLength - alamat.length

    const clear = () => {
        formRef.current?.reset() 
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        const data_distributor = {
            nama: formData.get("nama")?.toString().trim(),
            email: formData.get("email")?.toString().trim(),
            alamat: formData.get("alamat")?.toString().trim(),
            notelp: formData.get("notelp")?.toString().trim(),
            keterangan: formData.get("keterangan")?.toString().trim(),
        }

        try{

            const respon = await fetch(`${baseUrl}/api/data-distributor`,{
                method: "POST",
                headers:{
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data_distributor)
            })

            if(!respon.ok){
                console.error("Gagal menyimpan distributor")
                toast.error("Gagal menyimpan data distributor")
            }

            console.log(`Data distributor ${nama} berhasil disimpan`)
            toast.success(`Data distributor ${nama} berhasil disimpan`)
            clear()

        }catch(error){
            console.error("Error Menyimpan distributor", error)
        }finally{
            setLoading(false)
        }

    }

    return(
    <div>
        <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
        <div className="my-7 grid font-mono w-full max-w-3xl items-center gap-3">
            <h1 className="mb-5 text-lg text-center">Tambah Distributor</h1>
            <Label htmlFor="nama" className="text-lg">Nama Distributor</Label>
            <Input type="text" id="nama" name="nama" 
            placeholder="Ketik Nama Distributor"  className="border" required/>
        </div>
        <div className="my-7 grid font-mono w-full max-w-3xl items-center gap-3">
            <Label htmlFor="email" className="text-lg">Email Distributor</Label>
            <Input type="email" id="email" name="email" 
            placeholder="Ketik Email Distributor"  className="border" />
        </div>
        <div className="my-7 font-mono grid w-full max-w-3xl items-center gap-3">
            <Label htmlFor="notelp" className="text-lg">No. Telepon Distributor</Label>
            <Input type="tel" id="notelp" name="notelp" 
            placeholder="Ketik Nomor Telephone Distributor"  className="border" />
        </div>
        <div className="my-7 grid font-mono w-full max-w-3xl items-center gap-3">
            <Label htmlFor="alamat" className="text-lg">Alamat</Label>
            <InputGroup className="border">
                <InputGroupTextarea
                name="alamat"
                id="alamat"
                placeholder="Masukkan alamat"
                onChange={(e) => setAlamat(e.target.value.slice(0, maxLength))}  // paksa limit
                maxLength={maxLength}
                rows={3}
                />
                <InputGroupAddon align="block-end">
                <InputGroupText className="text-muted-foreground text-xs">
                    {remaining}/{maxLength} karakter
                    {remaining < 20 && <span className="text-destructive ml-1">!</span>}
                </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
         <div className="my-7 font-mono grid w-full max-w-3xl items-center gap-3">
            <Label htmlFor="keterangan" className="text-lg">Keterangan</Label>
            <Input type="text" id="keterangan" name="keterangan" 
            placeholder="Ketik Keterangan"  className="border" />
        </div>
        <div className="flex gap-3 mt-6 max-w-3xl">
            <Button
                variant="destructive" 
                className="flex-1 h-14 text-xl"
                onClick={clear}
            >
                Reset
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-14 text-xl">
                {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <CirclePlus className="mr-2 h-5 w-5" />
                )}
                {loading ? "Menyimpan..." : "Simpan Data"}
            </Button>
            </div>
        </form>
    </div>
    )
}



