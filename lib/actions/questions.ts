"use server"

import { ApiResponse, IForm, IQuestion } from "@/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const getQuestions=async (formId:string):Promise<ApiResponse<IQuestion[]>> =>{
    const token=cookies().get("token")?.value
    try{
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/questions`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const data=await response.json()
        // console.log(data)
        return {
            msg:"success",
            data:data.questions
        }
    }catch(error){
        return {
            msg:"error"
        }
    }
}

export const createQuestions=async(formId:string,questions:IQuestion[]):Promise<ApiResponse<IQuestion[]>> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/questions`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({questions})
        })
        const res_data=await response.json()
        // console.log(res_data)
        // revalidatePath('/dashboard')
        return {
            msg:"success",
            // data:res_data
        }
    } catch (error) {
        return {
            msg:"error"
        }
    }
}