import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import {prisma} from "@/lib/prisma"
import { jwt } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"


export const auth = betterAuth({
  
  database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
 emailAndPassword: { 
        enabled: true, 
  },
  user: {
    additionalFields: {
      tipe: {
        type: "string",      // atau "enum" kalau pakai Prisma enum
        required: true,
        defaultValue: "user", // default user biasa
        input: true,         // boleh diisi saat signUp
      },
    },
  },
  plugins: [ 
        jwt(),
        nextCookies(),
    ] 
})