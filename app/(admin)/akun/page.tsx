
// Halaman tabel daftar akun

import TabelAkun from "./tabel-akun"
import EditAkun from "./edit-akun/edit-akun"

export default function HalamanAkun(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="text-lg font-bold">Tabel Daftar Akun</h1>
            </div>
            <div className="px-4 lg:px-6">
                <TabelAkun/>
            </div>
            <div className="px-4 lg:px-6">
                <EditAkun/>
            </div>
        </div>
    )
}

