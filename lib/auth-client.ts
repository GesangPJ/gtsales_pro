import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    plugins:[
        inferAdditionalFields({
            user:{
                notelp: { type: "string", required: false, input:true, },
                alamat: { type: "string", required: false, input: true, },
                tipe: {
                    type: "string", 
                    required: true,
                    defaultValue: "user",
                    input: true,
                },
            }
        })
    ]
})
