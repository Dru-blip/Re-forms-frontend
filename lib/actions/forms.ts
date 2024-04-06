"use server"

import { cookies } from "next/headers"
import { z } from "zod"
import { userLoginSchema,userRegisterSchema } from "../form-validation"


export const registerFormAction=async(values: z.infer<typeof userRegisterSchema>)=>{
    const user={...values}

    try{
        const res=await fetch(process.env.AUTH_API_URL+'/register',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:JSON.stringify({"user":user})
        })

        const data=await res.json()
        if (data.msg === 'success') {
            if (data.token) {
                cookies().set("token", data.token)
            }
            return {
                msg: "success"
            }
        }
        return {
            msg:"error"
        }
        
    }catch(e){
        return {
            msg:"error"
        }
    }
}

export const loginFormAction = async (values: z.infer<typeof userLoginSchema>) => {

    const user = { ...values }

    try {
        const res = await fetch(process.env.AUTH_API_URL + '/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ "user": user })
        })

        const data = await res.json()
        if (data.msg === 'success') {
            if (data.token) {
                cookies().set("token", data.token)
            }
            return {
                msg: "success"
            }
        }
        return {
            msg:"error"
        }
    } catch (e) {
    
        return {
            msg: "error"
        }
    }

}