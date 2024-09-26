"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props{
    href:string,
    name:string
}


export default function LinkCard({href,name}:Props){
    const path=usePathname()
    return (
        <Link href={href} className={path.includes(name.toLowerCase())?`bg-accent text-primary p-2 rounded font-semibold`:`text-primary hover:underline p-2`}>
            {name}
        </Link>
    )
}