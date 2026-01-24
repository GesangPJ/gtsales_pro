
// Halaman data toko
import K_DataToko from "./data-toko"

export default function HalamanDataToko(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                {/* 2xKolom */}
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <K_DataToko/>

                </div>
                
            </div>
        </div>
    )
}



