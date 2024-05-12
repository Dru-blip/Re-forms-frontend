"use server"

import { ApiResponse, ISettings } from "@/types"
import { cookies } from "next/headers"


export const getSetting=async (id:string):Promise<ApiResponse<ISettings>> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${id}/settings`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const res_data=await response.json()
        
        return {
            msg:"success",
            data:res_data.setting
        }
    } catch (error) {
        return {
            msg:"error"
        }
    }
}

export const saveSettings=async (formId:string,settingId:string,setting:ISettings):Promise<ApiResponse<ISettings>> =>{
    const token=cookies().get("token")?.value
    
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/settings/${settingId}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({setting})
        })
        const res_data=await response.json()
        
        return {
            msg:"success",
            data:res_data.setting
        }
    } catch (error) {
        return {
            msg:"error"
        }
    }
}