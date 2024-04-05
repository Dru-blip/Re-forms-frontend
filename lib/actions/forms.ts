

"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export const loginFormAction=async (prevState:any,formData:FormData)=>{

    const user={
            email:formData.get("email"),
            password:formData.get("password")
        }


    const res=await fetch(process.env.AUTH_API_URL+'/login',{
        headers:{
            'Accept': 'application/json',
      'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({"user":user})
    })
    const data=await res.json()
    
    if(data.token){
        cookies().set("token",data.token)
    }

    redirect("/")
}