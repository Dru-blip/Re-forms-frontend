"use client"

import { ThemeSwitch } from "./theme-toggle"

export default function Header(){
    return (
        <div className="flex justify-end p-2">
            <ThemeSwitch/>
        </div>
    )
}