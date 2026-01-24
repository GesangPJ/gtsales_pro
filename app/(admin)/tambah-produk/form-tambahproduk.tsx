// Komponen Form Tambah produk
"use client"

import { useState, useEffect, useRef } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {IconArrowBadgeDownFilled, IconDeviceFloppy} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"
import {Save} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {CirclePlus} from "lucide-react"
import { baseUrl } from '@/lib/base-url'

type Kategori = {
  id: number
  nama_kategori: string
}

export default function FormTambahProduk() {
    const [value, setValue] = useState("")
    const maxLength = 250 // banyaknya kata untuk textarea
    const remaining = maxLength - value.length  //sisa kata untuk textarea
    const [loading, setLoading] = useState(false)
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(null)
    const [selectedKategoriId, setSelectedKategoriId] = useState<string>("")
    const formRef = useRef<HTMLFormElement>(null)
    const [jenisProduk, setJenisProduk] = useState("")

    // reset form jika tombol reset diklik
    const clear = () => {
        formRef.current?.reset() 
        setValue("")   // reset keterangan
        setSelectedKategori(null)  // reset kategori
    }

    // ambil nama kategori dari API
    async function getKategori() {
        try {
        const res = await fetch(`${baseUrl}/api/data-kategori`)
        if (!res.ok) throw new Error("Gagal ambil data kategori")
        const data: Kategori[] = await res.json()
        setKategoris(data)
        } catch (error) {
        console.error("Data Kategori tidak dapat diambil dari API", error)
        }
    }

    useEffect(() => {
        getKategori()
    }, [])

    const handleSelectKategori = (id: string) => {
        setSelectedKategoriId(id)
        const kategori = kategoris.find(k => k.id.toString() === id)
        setSelectedKategori(kategori || null)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        const data_produk = {
            nama_produk: formData.get("nama_produk")?.toString().trim(),
            hargajual: formData.get("harga_jual")?.toString().trim(),
            hargabeli: formData.get("harga_beli")?.toString().trim(),
            barcodeproduk: formData.get("barcode")?.toString().trim(),
            idkategori: selectedKategori?.id || 0,
            stokproduk: formData.get("stok")?.toString().trim(),
            keterangan: formData.get("keterangan")?.toString().trim(),
            jenisproduk: jenisProduk,
        }

        console.log({ data_produk })

        setLoading(true)

        try{
            const res = await fetch(`${baseUrl}/api/data-produk`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_produk)
            })
            if (!res.ok) {
            toast.error("Terjadi kesalahan saat menyimpan data")
            throw new Error("Gagal menyimpan data produk")
            }
            toast.success("produk berhasil ditambahkan 🎉")
            formRef.current?.reset()
            setValue("")
            setSelectedKategori(null)
        } catch(error){
            console.error("Error Menyimpan produk", error)
        } finally{
            setLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="max-w-150">
                    <div className="my-3">
                        <Label htmlFor="nama_produk" className="text-lg">Nama produk</Label>
                        <Input type="text" id="nama_produk" name="nama_produk" placeholder="Masukkan Nama produk"  className="border" required/>
                    </div>
                    <div className="my-7">
                        <Label htmlFor="jenis" className="text-lg">Jenis Produk</Label>
                        <Select onValueChange={setJenisProduk} value={jenisProduk}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Pilih Jenis Produk" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BARANG">BARANG</SelectItem>
                                <SelectItem value="PANGAN">PANGAN</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="my-7">
                        <DropdownMenu>
                            <DropdownMenuTrigger  asChild>
                                <Button variant="outline">
                                    {selectedKategori
                                        ? selectedKategori.nama_kategori
                                        : "Pilih Kategori"}{" "}
                                    <IconArrowBadgeDownFilled className="ml-2" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
                                {kategoris.map((kategori) => (
                                <DropdownMenuItem
                                    key={kategori.id}
                                    onClick={() => setSelectedKategori(kategori)}
                                >
                                    {kategori.nama_kategori}
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                
                    <div className="my-7 max-w-150 grid items-center gap-3">
                        <Label htmlFor="harga_jual" className="text-lg">Harga Jual</Label>
                        <InputGroup  className="border max-w-150">
                        <InputGroupInput
                        type="number" 
                        name="harga_jual"
                        id="harga_jual" 
                        placeholder="Masukkan Harga Jual produk" 
                        required/>
                        <InputGroupAddon align="inline-start">
                            <InputGroupText>Rp</InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                        
                    </div>
                    <div className="my-7 grid max-w-150 gap-3">
                        <Label htmlFor="harga_beli" className="text-lg">Harga Beli</Label>
                        <InputGroup   className="border">
                        <InputGroupInput type="number" id="harga_beli" name="harga_beli" placeholder="Masukkan Harga Beli produk" required/>
                        <InputGroupAddon align="inline-start">
                            <InputGroupText>Rp</InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                    </div>&nbsp;
                </div>
                {/* Kolom kanan */}
                <div className="max-w-150">
                    <div className="my-3">
                        <Label htmlFor="barcode" className="text-lg">Kode Barcode produk</Label>
                        <InputGroup  className="border">
                        <InputGroupInput 
                        type="number"
                        inputMode='numeric'
                        min={0}
                        minLength={8}
                        maxLength={14}
                        pattern="[0-9]*"
                        id="barcode" 
                        name="barcode" 
                        placeholder="Kode Barcode Opsional"/>
                        </InputGroup>
                    </div>
                    <div className="my-3 grid max-w-150 items-center gap-3">
                        <Label htmlFor="stok" className="text-lg">Stok Awal</Label>
                        <Input 
                        className="border"
                        min={0}
                        type="number" 
                        id="stok"
                        name="stok" 
                        placeholder="Masukkan Stok awal produk"/>
                    </div>&nbsp;
                    <div className="grid max-w-150 items-center gap-3">
                        <Label htmlFor="keterangan" className="text-lg">Keterangan</Label>
                        <InputGroup className="border">
                            <InputGroupTextarea
                            name="keterangan"
                            id="keterangan"
                            placeholder="Masukkan Keterangan produk"
                            value={value}
                            onChange={(e) => setValue(e.target.value.slice(0, maxLength))}  // Enforce limit
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
                </div>
                </div>
                <div className="flex gap-3 mt-3 items-center">
                    <Button
                        variant="destructive" 
                        className="flex-1 h-14 text-xl"
                        onClick={clear}
                    >
                        Reset
                    </Button>
                    <Button type="submit" disabled={loading || !selectedKategori}
                    className="flex-1 h-14 text-lg" >
                        <Save className="h-32 w-32" />
                        {loading ? "Menyimpan..." : "Simpan"}
                    </Button>
                </div>
        </form>
            
    )
}




