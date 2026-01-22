// Halaman Kategori

import TabelKategori from "./tabel-kategori"

export default function HalamanKategori(){
    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="font-bold text-xl">Kategori Produk</h1>
            </div>
            <div className="px-4 lg:px-6 max-w-120">
                <TabelKategori />
            </div>
        </div>
    )
}


