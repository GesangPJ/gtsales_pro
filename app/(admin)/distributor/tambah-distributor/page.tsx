
// Halaman Tambah Data Distributor

import FormTambahDistributor from "./form-distributor"
import EditDistributor from "./edit-distributor"

export default function TambahDistributor(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormTambahDistributor/>
                <EditDistributor/>

            </div>
        </div>
    )
}


