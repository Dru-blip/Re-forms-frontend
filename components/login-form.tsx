
"use client"

import { useFormState } from "react-dom"
import { loginFormAction } from "@/lib/actions/forms"

export default function LoginForm(){
    const [state,formAction]=useFormState(loginFormAction,{msg:""})
    return (
        <form action={formAction} className="flex flex-col items-center justify-center min-h-screen text-black">
            <input placeholder="enter email address" name="email" type="email"/>
            <input placeholder="enter your password" name="password" type="password"/>
            <button type="submit" className="bg-red-400">submit</button>
        </form>
    )
}