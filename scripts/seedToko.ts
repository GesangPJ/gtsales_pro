
// Seed Data Toko

import { prisma } from "@/lib/prisma"

async function seedToko(){

    try{
        const DataToko = await prisma.toko.create({
            data:{
                nama:"Prabu G28",
                alamat:"BSD City Navapark Lot",
                email:"sales@prabu.com",
                notelp:"021-12345678",
                siup:"0889-671696915",
                npwp:"69691650-0270870870-256",
            },
        })

        console.log(`Seed Data Toko selesai`, DataToko)

    }catch(error){
        console.error(`Error membuat data toko`, error)

    }finally{
        await prisma.$disconnect
    }
}

seedToko().catch((e)=>
{
    console.error(e)
    process.exit(1)
})
