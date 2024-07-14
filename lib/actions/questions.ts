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

export const updateQuestion=async (formId:string,question:IQuestion):Promise<ApiResponse<IQuestion>> =>{
    const token=cookies().get("token")?.value
    try{
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/question/${question.id}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({question})
        })

        const res_data=await response.json()
        return {
            msg:"success",
            data:res_data
        }
        
    }catch(e){
        
        return {
            msg:"error"
        }
    }
}

export const deleteQuestion=async (formId:string,questionId:string):Promise<ApiResponse<IQuestion>> =>{
    const token=cookies().get("token")?.value
    try{
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/question/${questionId}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })

        const res_data=await response.json()
        return {
            msg:"success",
            data:res_data
        }
        
    }catch{
        return {
            msg:"error"
        }
    }
}

export const createQuestion=async (formId:string,question:IQuestion):Promise<ApiResponse<IQuestion>> =>{
    const token=cookies().get("token")?.value
    try{
        
        let {id,...data}={...question}
        
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/question`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({question:data})
        })

        const res_data=await response.json()
        return {
            msg:"success",
            data:res_data
        }
        
    }catch{
        return {
            msg:"error"
        }
    }
}

export const createQuestions=async(formId:string,questions:IQuestion[],deletedQuestions:IQuestion[]):Promise<ApiResponse<IQuestion[]>> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${formId}/questions`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({questions,deletedQuestions})
        })
        const res_data=await response.json()
        // console.log(res_data)
        revalidatePath(`/forms/${formId}/edit`)
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