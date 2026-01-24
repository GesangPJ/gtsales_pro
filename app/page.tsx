import { LoginForm } from "@/components/signin-form"
import { AppInfo } from "@/components/app-info"
import { ShoppingBag } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Page() {
return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div  className="flex items-center gap-2 self-center font-medium">
          <ShoppingBag/>
          <h1 className="font-bold text-2xl">GTSALES <span className="font-bold text-yellow-600">PRO</span></h1><AppInfo/> <ModeToggle/>
        </div>
        <LoginForm />
      </div>
    </div>
)
}