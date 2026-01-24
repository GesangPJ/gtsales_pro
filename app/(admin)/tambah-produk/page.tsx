
// Halaman Tambah Produk

import FormTambahProduk from "./form-tambahproduk"

export default function HalamanTambahProduk(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="font-bold text-xl">Tambah Produk</h1>
            </div>
            <div className="px-4 lg:px-6">
                <FormTambahProduk/>
            </div>
        </div>
    )
}

