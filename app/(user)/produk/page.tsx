// Halaman Daftar Produk

import TabelProduk from "./tabel-produk"


export default function HalamanProduk(){
    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="font-bold text-lg">Daftar Produk</h1>
            </div>
            <div className="px-4 lg:px-6">
                <TabelProduk/>
            </div>
        </div>
    )
}



