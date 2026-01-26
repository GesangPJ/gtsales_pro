
// Halaman Status pembelian

import TabelStatusPembelian from "./tabel-status-pembelian"

export default function HalamanStatusPembelian(){

    return(
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
            <h1 className="font-bold text-xl mb-5">Status Pembelian</h1>
            <TabelStatusPembelian/>
        </div>
        <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        </div>
    </div>
    )
}


