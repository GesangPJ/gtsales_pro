
// Halaman daftar penjualan
import TabelPenjualan from "./tabel-daftar-penjualan"

export default function HalamanPenjualan(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                  <h1 className="text-2xl font-bold">Daftar Penjualan</h1>
              </div>
            <div className="px-4 lg:px-6">
                <TabelPenjualan/>
            </div>  
          </div>
    )
}


