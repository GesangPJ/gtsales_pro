// Script membuat akun user

import { auth } from "@/lib/auth"

async function registerUser(){
    const ADMIN_EMAIL = "user@email.com"
    const ADMIN_PASSWORD = "user12345678"
    const ADMIN_NAME = "User test 01"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"user",
            },
        })

        const newAdmin = result.user

        console.log("Akun User berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT AKUN:");
        console.error(error.message);
    }
}

registerUser()


