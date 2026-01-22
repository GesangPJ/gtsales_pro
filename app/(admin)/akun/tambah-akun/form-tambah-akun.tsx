
// Form Tambah Akun

"use client"

import { useState, useRef } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupTextarea, } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {CirclePlus, Loader2} from "lucide-react"
import { authClient } from '@/lib/auth-client'


export default function FormTambahAkun(){

    const formRef = useRef<HTMLFormElement>(null)
    const [alamat, setAlamat] = useState("")
    const [tipeakun, setTipeAkun] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const maxLength = 150
    const remaining = maxLength - alamat.length

    const clear = () => {
        formRef.current?.reset() 
        setAlamat("")
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        const data_akun = {
            name: formData.get("name")?.toString().trim(),
            email: formData.get("email")?.toString().trim(),
            password: formData.get("password")?.toString().trim(),
            notelp: formData.get("notelp")?.toString().trim(),
            alamat: formData.get("alamat")?.toString().trim(),
            tipe: tipeakun,
        }

        const { data, error } = await authClient.signUp.email({
            email: data_akun.email!,
            password: data_akun.password!,
            name: data_akun.name!,
            notelp: data_akun.notelp || null,
            alamat: data_akun.alamat || null,
            tipe: data_akun.tipe,
        })

        if (error) {
            toast.error(error.message)
            return
        }

        setLoading(false)
        toast.success("Akun berhasil dibuat 🎉")
        formRef.current?.reset()
        setAlamat("")
        

    }



    return(
    <div>
        <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
            <div className="grid w-full max-w-3xl items-center gap-3">
                    <Label htmlFor="name" className="text-lg">Nama Akun</Label>
                    <Input type="text" id="name" name="name" placeholder="Ketik Nama Akun"  className="border" required/>
                    <div className="mt-3 mb-3 max-w-3xl">
                        <Select onValueChange={setTipeAkun} >
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Pilih Tipe Akun" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>&nbsp;
                <div className="grid w-full max-w-3xl items-center gap-3">
                <Label htmlFor="email" className="text-lg">Email Akun</Label>
                    <Input type="email" id="email" name="email" placeholder="Ketik email akun"  className="border" required/>
                &nbsp;
                <Label htmlFor="password" className="text-lg">Password Akun</Label>
                    <Input type="password" id="password" name="password" placeholder="Ketik password akun"  className="border" required/>
                </div>
                <div className="grid w-full max-w-3xl items-center gap-3 mt-3 mb-3">
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
                </div>&nbsp;

                <div className="grid w-full max-w-3xl items-center gap-3">
                    <Label htmlFor="notelp" className="text-lg">Nomor Telepon</Label>
                    <Input type="tel" id="notelp" name="notelp" placeholder="Ketik Nomor Telepon"  className="border" />
                </div>

                <div className="flex gap-3 mt-6 max-w-3xl">
                <Button
                    variant="destructive" 
                    className="flex-1 h-14 text-xl"
                    onClick={clear}
                >
                    Reset
                </Button>
                <Button type="submit" disabled={loading || !tipeakun} className="flex-1 h-14 text-xl">
                    {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <CirclePlus className="mr-2 h-5 w-5" />
                    )}
                    {loading ? "Membuat..." : "Tambah Akun"}
                </Button>
                </div>
                
        </form>
    </div>
    )
}


