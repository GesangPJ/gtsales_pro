
// Script tambah data kategori produk

import {prisma} from '@/lib/prisma'

async function SeedKategori(){

    try{
        const kategori = await prisma.kategori.createMany({
            data:[
                {nama:'Beras'},
                {nama:'Minyak Goreng'},
                {nama:'Gula'},
                {nama:'Tepung Terigu'},
                {nama:'Voucher'},
                {nama:'Top Up'},
                {nama:'Smartphone'},
                {nama:'Mesin Cuci'},
                {nama:'TV'},
                {nama:'Kulkas'},
                {nama:'CPU'},
                {nama:'VGA CARD'},
                {nama:'RAM'},
                {nama:'SSD'},
                {nama:'Minuman Ringan'},
                {nama:'Pensil'},
                {nama:'Pulpen'},
                {nama:'Penghapus'},
                {nama:'Penggaris'},
                {nama:'Spidol'},
                {nama:'Print'},
                {nama:'Buku Gambar'},
                {nama:'Detergent'},
                {nama:'Software'},
                {nama:'Mouse'},
                {nama:'Keyboard'},
                {nama:'MicroSD Card'},
                {nama:'SD Card'},
                {nama:'DVD'},
                {nama:'CD'},
                {nama:'Kopi'},
                {nama:'Sabun Mandi'},
                {nama:'Sabun Cuci'},
                {nama:'Mie Instan'},
                {nama:''},

            ]
        })

        console.log(`Seed Data Kategori berhasil`, kategori)

    }catch(error){
        console.error(`Error menambahkan Data`, error)

    }finally{
        await prisma.$disconnect
    }
}

SeedKategori().catch((e)=>{
    console.error(e)
    process.exit(1)
})

