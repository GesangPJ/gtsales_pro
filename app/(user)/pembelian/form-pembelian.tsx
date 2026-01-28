// Form Pembelian Produk

"use client"

import { useState, useEffect} from 'react'
import { keranjangPembelian } from './keranjang-pembelian'
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { columnpembelian } from './kolom-pembelian'
import { Button } from '@/components/ui/button'
import { Search, InfoIcon, Warehouse } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 
import { baseUrl } from '@/lib/base-url'
import {IconArrowBadgeDownFilled, IconDeviceFloppy} from "@tabler/icons-react"
import { authClient } from "@/lib/auth-client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Produk = {
    id: number,
    nama: string,
    harga_beli: number,
    stok:number,
    jumlah: number,
    total:number,
    totalharga: number,
}

type Distributor = {
    id: number
    nama: string
}

export default function FormPembelian(){
    const { items, addItem, clear } = keranjangPembelian()
    const [data, setData] = useState(items)
    // const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Produk[]>([])
    // const barcodeRef = useRef<HTMLInputElement>(null)
    const [loadingBayar, setLoadingBayar] = useState(false)
    const [biayaKirim, setBiayaKirim] = useState(0)
    const [distributors, setDistributor] = useState<Distributor[]>([])
    const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null)
    const [metodeTransaksi, setMetodeTransaksi] = useState("")

    const { data: session } = authClient.useSession()

    const id_akun = session?.user.id
    
    const Reset = () => {
        clear()
        setBiayaKirim(0)
        setSelectedDistributor(null)
        setMetodeTransaksi("")
    }

    const total = items.reduce((sum, item) => sum + (item.harga_beli * item.jumlah), 0)

    const totalsemua = total + biayaKirim

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    async function ambilDistributor(){

        try{
            const respon = await fetch(`${baseUrl}/api/nama-distributor`)
            if (!respon.ok) throw new Error("Gagal ambil nama distributor")

            const hasil: Distributor[] = await respon.json()

            setDistributor(hasil)

        }catch(error){
            console.error("Nama distributor tidak bisa diambil dari API", error)
        }
    }

    // Sync data dengan store
    useEffect(() => {
        setData(items)
        ambilDistributor()
    }, [items])

    const debouncedSearch = useDebouncedCallback(async (query: string) => {
        if (query.length < 2) {
        setSearchResults([])
        return
        }
        
        try {
        const res = await fetch(`${baseUrl}/api/cari-produk?q=${encodeURIComponent(query)}`)
        if (res.ok) {
            const results = await res.json()
            setSearchResults(results)
        }
        } catch (error) {
        console.error("Search error:", error)
        }
    }, 300)


    const handleNamaSelect = (produk: Produk) => {
        addItem({ ...produk, jumlah: 1 })
        setSearch("")
        setSearchResults([])
    }

    const handleBayar = async () => {
        setLoadingBayar(true)
        
        // Siapkan data untuk API
        const dataPembelian = {
            userId: id_akun,
            distributorId : selectedDistributor?.id || null,
            biayakirim: biayaKirim || 0,
            metode: metodeTransaksi || "CASH",
            totalharga: totalsemua,
            produk: items.map(item => ({
                id: item.id,
                jumlah: item.jumlah,
                harga_beli: item.harga_beli,
                total: item.totalharga,
            }))
        }
        
        try {
            const res = await fetch(`${baseUrl}/api/transaksi-pembelian`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataPembelian),
            })
            
            if (res.ok) {
            toast.success('Transaksi Pembelian berhasil! 🎉')
            clear()  // Kosongkan cart
            setSelectedDistributor(null)
            setBiayaKirim(0)
            setMetodeTransaksi("")
            } else {
            toast.error('Gagal membuat pembelian')
            }
        } catch (error) {
            toast.error('Error koneksi')
        } finally {
            setLoadingBayar(false)
        }
    }

    return(
        <div className="space-y-4">
            <div className="max-w-full">
                <DropdownMenu>
                <DropdownMenuTrigger  asChild>
                    <Button variant="outline">
                        {selectedDistributor
                            ? selectedDistributor.nama
                            : "Pilih Distributor"}{" "}
                        <IconArrowBadgeDownFilled className="ml-2" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
                    {distributors.map((distributor) => (
                    <DropdownMenuItem
                        key={distributor.id}
                        onClick={() => setSelectedDistributor(distributor)}
                    >
                        {distributor.nama}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
            <InputGroup>
            <InputGroupInput
            className="font-mono text-xl tracking-widest"
            placeholder="Ketik Nama Produk..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value)
                debouncedSearch(e.target.value)
            }}
            />
            <InputGroupAddon>
            <Search className="h-5 w-5" />
            </InputGroupAddon>
        </InputGroup>
        
        {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-lg p-2 bg-background">
            {searchResults.slice(0, 9).map((produk) => (
                <div
                key={produk.id}
                className="p-3 hover:bg-accent rounded-md cursor-pointer border flex items-center space-x-3"
                onClick={() => handleNamaSelect(produk)}
                >
                <div className="font-medium">{produk.nama}</div>
                <div className="text-sm text-muted-foreground ml-1">stok:{produk.stok}</div>
                <div className="text-sm text-muted-foreground ml-1">
                    {new Intl.NumberFormat("id-ID", { 
                    style: "currency", 
                    currency: "IDR", 
                    minimumFractionDigits: 0 
                    }).format(produk.harga_beli)}
                </div>
                </div>
            ))}
            </div>
        )}

        <DataTable columns={columnpembelian as any} data={data} />


            <div className="flex max-w-[300px]">
            <InputGroup>
                <InputGroupInput
                id="biayaKirim"
                type="number"
                min={0}
                placeholder='masukkan biaya pengiriman'
                value={biayaKirim}
                onChange={(e) => setBiayaKirim(parseInt(e.target.value) || 0)}
                />
                <InputGroupAddon align="block-start">
                <Label htmlFor="email-2" className="text-foreground">
                    Biaya Kirim
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
                    <p>Masukkan biaya jika ada biaya pengiriman</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
            </InputGroup>
            </div>
           <div className="text-right md:text-right space-y-2 mr-5 md:max-w-md md:ml-auto">
            <div className='ml-auto md:w-48 mb-10 pr-3'>
                <Select value={metodeTransaksi}
                        onValueChange={setMetodeTransaksi}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Metode Pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Metode Pembayaran</SelectLabel>  
                            <SelectItem value="CASH">
                                CASH
                            </SelectItem>
                            <SelectItem value="QRIS">
                                QRIS
                            </SelectItem>
                            <SelectItem value="TRANSFER">
                                TRANSFER
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
                <div className="text-3xl font-bold">
                    Jumlah Total: {formatRupiah(totalsemua)}
                </div>
            </div>
            <div className="flex gap-3">
            <Button
                variant="destructive" 
                className="flex-1 h-14 text-xl"
                onClick={Reset}
            >
                Reset
            </Button>
            <Button 
                className="flex-1 h-14 text-xl" 
                onClick={handleBayar}
                disabled={loadingBayar || items.length === 0}
            >
                {loadingBayar ? "Memproses..." : "Pesan Produk"}
            </Button>
            </div>
        </div>
    )

}
