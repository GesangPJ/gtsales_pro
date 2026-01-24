// Script membuat akun admin

import { auth } from "@/lib/auth"

async function registerAdmin(){
    const ADMIN_EMAIL = "admin@email.com"
    const ADMIN_PASSWORD = "admin12345678"
    const ADMIN_NAME = "Admin test 01"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"admin",
            },
        })

        const newAdmin = result.user

        console.log("Admin berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT ADMIN:");
        console.error(error.message);
    }
}

registerAdmin()


