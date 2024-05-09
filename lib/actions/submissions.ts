"use server"

import { ApiResponse, IAnswer, ISubmission } from "@/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const getAnswers=async (formId:string,questionId:string)=>{
    const token=cookies().get("token")?.value
    try{
        
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/${questionId}/answers`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const res_data=await response.json()
        
        return {
            msg:"success",
            data:res_data.answers
        }
    }catch(err){
        return {
            msg:"error"
        }
    }
}

export const getAnswersByQuestion=async (formId:string,questionId:string):Promise<ApiResponse<IAnswer[]>> =>{
    const token=cookies().get("token")?.value
    
    try{
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/question/${questionId}/answers`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const res_data=await response.json()
        // console.log(res_data)
        return {
            msg:"success",
            data:res_data.answers
        }
    }catch(err){
        console.log(err)
        return {
            msg:"error"
        }
    }
}

export const getSubmissions=async (id:string):Promise<ApiResponse<ISubmission[]>> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${id}/submissions`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const res_data=await response.json()
        
        return {
            msg:"success",
            data:res_data.responses
        }
    } catch (error) {
        return {
            msg:"error"
        }
    }
}

export const deleteSubmissions=async (id:string):Promise<ApiResponse<ISubmission[]>> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${id}/submissions`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const res_data=await response.json()
        revalidatePath(`/forms/${id}/responses`)
        return {
            msg:"success",
            data:res_data.responses
        }
    } catch (error) {
        return {
            msg:"error"
        }
    }
}