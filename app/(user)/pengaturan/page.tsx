
// Halaman pengaturan setiap akun 

import KomponenAkun from "./komponen-akun"
import GantiPassword from "./ganti-pass"

export default function HalamanPengaturan(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-4">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <KomponenAkun/>
                    <GantiPassword/>
                </div>

            </div>

        </div>
    )
}








