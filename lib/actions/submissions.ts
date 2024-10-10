"use server"

import { ApiResponse, Response,Answer } from "@/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const submitResponse=async (formId:string,formResponse:any)=>{
    const token=cookies().get("token")?.value
    try{
        
        const response=await fetch(process.env.BASE_API+`/${formId}/responses`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({...formResponse})
        })
        const responseData:ApiResponse<Response>=await response.json()
        return {
            msg:"success",
            data:responseData.data
        }
    }catch(err){
        return {
            msg:"error"
        }
    }
}