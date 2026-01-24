
// Komponen Edit Akun
"use client"

import { useState, useRef, useEffect } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { InfoIcon, SaveIcon, RotateCcw }from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {IconArrowBadgeDownFilled} from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { baseUrl } from "@/lib/base-url"

type DataAkun = {
    id: string,
    name: string
    email: string
    notelp: string
    alamat:string | null
    tipe: string | null
}

export default function EditAkun(){
   const formRef = useRef<HTMLFormElement>(null)
    const [selectedAkun, setSelectedAkun] = useState<DataAkun | null>(null)
    const [dataAkun, setDataAkun] = useState<DataAkun[]>([])
    const [loading, setLoading] = useState(false)
    const [alamat, setAlamat] = useState("")
    const [tipeakun, setTipeAkun] = useState<string>("")
    const maxLength = 150
    const remaining = maxLength - alamat.length

    // Ambil data akun saat component mount
    useEffect(() => {
        ambilAkun()
    }, [])

    const clear = () => {
        formRef.current?.reset() 
        setAlamat("")
    }

   async function ambilAkun() {
    try {
        const respon = await fetch(`${baseUrl}/api/data-akun`)
        if (!respon.ok) throw new Error("Gagal ambil data akun!")
        
        const result = await respon.json()
        
        // ✅ Ambil dari data_akun
        if (result.success && Array.isArray(result.data_akun)) {
            setDataAkun(result.data_akun)
        } else {
            console.error("Format data salah:", result)
            setDataAkun([])
        }
    } catch (error) {
        console.error("Error:", error)
        setDataAkun([])
    }
}

    // Handle pemilihan akun dari dropdown
    const handleSelectAkun = (akun: DataAkun) => {
        setSelectedAkun(akun)
        // Isi form dengan data akun yang dipilih
        const elements = formRef.current?.elements as any
        elements['name'].value = akun.name
        elements['email'].value = akun.email
        elements['notelp'].value = akun.notelp
        elements['alamat'].value = akun.alamat
        setAlamat(akun.alamat || "")
        setTipeAkun(akun.tipe || "") // sesuaikan jika ada field tipe akun
    }

    // Handle submit form
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        if (!selectedAkun) {
            alert("Pilih akun terlebih dahulu!")
            setLoading(false)
            return
        }

        const formData = new FormData(event.currentTarget)
        const updateData = {
            id: selectedAkun.id,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            notelp: formData.get('notelp') as string,
            alamat: formData.get('alamat') as string,
            tipeakun: formData.get('tipeakun') as string
        }

        try {
            const response = await fetch(`${baseUrl}/api/update-akun`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            })

            if (!response.ok) {
                throw new Error('Gagal update akun')
            }

            toast.success('Akun berhasil diupdate!')
            // Reset form setelah sukses
            formRef.current?.reset()
            setSelectedAkun(null)
            setAlamat("")
            setTipeAkun("")
        } catch (error) {
            console.error('Error updating akun:', error)
            toast.error('Gagal update akun!')
        } finally {
            setLoading(false)
        }
    }


    return(
        <div>
            <Card className="bg-accent/50 border dark:bg-card dark:border-border dark:shadow-sm">
                <CardHeader>
                    <CardTitle className="font-mono text-center text-xl warp-break-words hyphens-auto leading-relaxed">
                        Edit Data Akun
                    </CardTitle>
                </CardHeader>
            <CardContent className="font-mono">
            <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
            {/* 2 Kolom */}
            <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="my-5 max-w-150">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {selectedAkun ? selectedAkun.name : "Pilih Akun"}
                                <IconArrowBadgeDownFilled className="ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto p-1" align="start">
                            {dataAkun.map((akun) => (
                                <DropdownMenuItem
                                    key={akun.id}
                                    onClick={() => handleSelectAkun(akun)}
                                >
                                    {akun.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                {/* Nama Akun */}
                    <InputGroup className="text-lg mt-7">
                        <InputGroupInput 
                            id="name"
                            type="text"
                            name="name" 
                            placeholder="Nama Akun"
                            required
                        />
                        <InputGroupAddon align="block-start">  
                            <Label htmlFor="name" className="text-foreground">
                                Nama Akun
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton
                                        variant="ghost"
                                        aria-label="Help"
                                        className="ml-auto rounded-full"
                                        size="icon-xs"
                                    >
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nama Akun tidak boleh kosong</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Email Akun */}
                    <InputGroup className="text-lg mt-7">
                        <InputGroupInput 
                            id="email"
                            type="email"
                            name="email" 
                            placeholder="Email Akun"
                            required
                        />
                        <InputGroupAddon align="block-start">  
                            <Label htmlFor="email" className="text-foreground">
                                Email Akun
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton
                                        variant="ghost"
                                        aria-label="Help"
                                        className="ml-auto rounded-full"
                                        size="icon-xs"
                                    >
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Email Akun tidak boleh kosong</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* No Telp Akun */}
                    <InputGroup className="text-lg mt-7">
                        <InputGroupInput 
                            id="notelp"
                            type="tel"
                            name="notelp" 
                            placeholder="No. Telepon"
                            required
                        />
                        <InputGroupAddon align="block-start">  
                            <Label htmlFor="notelp" className="text-foreground">
                                No. Telepon
                            </Label>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    {/* Alamat & Tipe Akun */}
                
                    <div className="my-5 max-w-150">
                        <InputGroup className="border">
                            <InputGroupTextarea
                                name="alamat"
                                id="alamat"
                                placeholder="Masukkan alamat"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value.slice(0, maxLength))}
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
                        <div className="max-w-150">
                            <Label htmlFor="tipeakun" className="text-lg mb-2 block">Tipe Akun</Label>
                            <Select onValueChange={setTipeAkun} value={tipeakun} name="tipeakun">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Tipe Akun" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                </div>
                <Button
                    variant="destructive" 
                    className="flex-1 h-14 text-xl"
                    onClick={clear}
                > <RotateCcw/>
                    Reset
                </Button>

                <Button 
                    size="lg"
                    type="submit" 
                    variant="default"
                    className='flex-1 h-14 text-xl bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
                    disabled={loading || !selectedAkun}
                >
                    <SaveIcon/>
                    {loading ? "Menyimpan..." :  "Simpan"}
                </Button>
            </div>
        </form>
        </CardContent>
        </Card>
        </div>
    )
}





