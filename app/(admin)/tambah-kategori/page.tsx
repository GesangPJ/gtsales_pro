// Halaman Tambah Kategori Produk

import FormInputKategori from "./form-kategori"

export default function HalamanTambahKategori(){
    return(
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="font-bold text-xl">Tambah Kategori Produk</h1>
                </div>
                <div className="px-4 lg:px-6 max-w-120">
                    <FormInputKategori/>
                </div>
            </div>
        )
}


