
// Form Edit Data Distributor

'use client'
import { useState, useRef, useEffect } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupTextarea, } from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {CirclePlus, Loader2} from "lucide-react"
import { baseUrl } from '@/lib/base-url'
import {IconArrowBadgeDownFilled} from "@tabler/icons-react"

type DataDistributor = {
    id: number
    nama: string
    email: string
    alamat: string
    notelp: string
    keterangan: string
}

export default function EditDistributor(){
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [dataDistributor, setDataDistributor] = useState<DataDistributor[]>([])
    const maxLength = 150
    const remaining = maxLength - alamat.length
    const [selectedDistributor, setSelectedDistributor] = useState<DataDistributor | null>(null)

    const clear = () => {
        formRef.current?.reset() 
    }

    useEffect(()=>{
        ambilDistributor()
    }, [])


    async function ambilDistributor(){
        try{
            const respon = await fetch(`${baseUrl}/api/data-distributor`)

            if(!respon.ok) throw new Error("Gagal ambil data distributor!")

            const hasil = await respon.json()

            if( hasil.success && Array.isArray(hasil.data_distributor)){
                setDataDistributor(hasil.data_distributor)
            }
            else{
                 console.error("Format data salah:", hasil)
            setDataDistributor([])
            }

        }catch (error) {
        console.error("Error:", error)
        setDataDistributor([])
    }

    }

    const handleSelectDistributor = (distributor : DataDistributor) =>{
        setSelectedDistributor(distributor)

        const elements = formRef.current?.elements as any
        elements['nama'].value = distributor.nama
        elements['email'].value = distributor.email
        elements['alamat'].value = distributor.alamat
        elements['notelp'].value = distributor.notelp
        elements['keterangan'].value = distributor.keterangan
        setAlamat(distributor.alamat || " ")
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        setLoading(true)

        if(!selectedDistributor){
            toast.warning("Pilih Distributor dulu!")
            setLoading(false)
            return
        }

        const formData = new FormData(event.currentTarget)

        const updateDistributor = {
            id: selectedDistributor.id,
            nama: formData.get('nama') as string,
            email: formData.get('email') as string,
            notelp: formData.get('notelp') as string,
            alamat: formData.get('alamat') as string,
            keterangan: formData.get('keterangan') as string,
        }

        try{
            const respon = await fetch(`${baseUrl}/api/data-distributor`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateDistributor)
            })

            if(!respon){
                throw new Error("Gagal ubah data distributor")
            }

            toast.success(`Distributor ${nama} berhasil diubah`)
            formRef.current?.reset()
        }catch(error){
            console.error('Error update distributor:', error)
            toast.error('Gagal update distributor!')
        } finally{
            setLoading(false)
        }
    }


    return(
        <div>
        <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
        <div className="my-7 grid font-mono w-full max-w-3xl items-center gap-3">
            <h1 className="text-lg mb-5 text-center">Edit Distributor</h1>
            <div className=" max-w-150">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedDistributor ? selectedDistributor.nama : "Pilih distributor"}
                            <IconArrowBadgeDownFilled className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto p-1" align="start">
                        {dataDistributor.map((distributor) => (
                            <DropdownMenuItem
                                key={distributor.id}
                                onClick={() => handleSelectDistributor(distributor)}
                            >
                                {distributor.nama}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        
        </div>
        <div className="my-7 grid font-mono w-full max-w-3xl items-center gap-3">
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
                {loading ? "Menyimpan..." : "Update Distributor"}
            </Button>
            </div>
        </form>
    </div>
    )
}



