
"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { logout } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"

export default function LogoutButton(){
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const router=useRouter()
    const onClick=async ()=>{
        setIsLoading(true)
        await logout()
        setIsLoading(false)
        router.push("/login")
    }
    return (
        <Button  variant={"outline"}  onClick={onClick}><LogOutIcon className="mr-2 w-4 h-4"/> Logout</Button>
    )
}