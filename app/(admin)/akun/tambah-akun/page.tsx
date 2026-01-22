
// Halaman menambahkan akun
import FormTambahAkun from "./form-tambah-akun"


export default async function HalamanTambahAkun(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1>Tambah Akun</h1>
            </div>
            <div className="px-4 lg:px-6">
                <FormTambahAkun/>
            </div>
        </div>
    )
}


