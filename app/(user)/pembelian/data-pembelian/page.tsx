
// Halaman Daftar Pembelian

import TabelPembelian from "./tabel-data-pembelian"

export default function HalamanDaftarPembelian(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <TabelPembelian/>
            </div>
        </div>
    )
}







