import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import {prisma} from "@/lib/prisma"
import { jwt } from "better-auth/plugins"
import { captcha } from "better-auth/plugins"


export const auth = betterAuth({
  
  database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
 emailAndPassword: { 
        enabled: true, 
  },
  plugins: [ 
        jwt(),
        captcha({ 
            provider: "cloudflare-turnstile",
            secretKey: process.env.TURNSTILE_SECRET_KEY!, 
        }),
    ] 
})