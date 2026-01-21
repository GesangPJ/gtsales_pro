// Script membuat akun admin

import { auth } from "@/lib/auth"

async function registerOwner(){
    const ADMIN_EMAIL = "owner@email.com"
    const ADMIN_PASSWORD = "owner12345678"
    const ADMIN_NAME = "Owner test 01"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"owner",
            },
        })

        const newAdmin = result.user

        console.log("Akun Owner berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT AKUN:");
        console.error(error.message);
    }
}

registerOwner()


