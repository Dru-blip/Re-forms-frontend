"use client"

import LogoutButton from "./auth/logout-button";
import { Label } from "./ui/label";

interface Props{

}

export default function DashboardHeader({}:Props) {
    const userDetails=JSON.parse(window.localStorage.getItem("userDetails")!)
    return (
        <div className="flex items-center justify-end gap-4 p-2">
            <div>
                <Label>{userDetails.name}</Label>
            </div>
            <LogoutButton/>
        </div>
    )
}