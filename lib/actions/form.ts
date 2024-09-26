"use server";

import { ApiResponse, Form } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export const getAllForms=async ():Promise<ApiResponse<IForm[]>> =>{
//     const token=cookies().get("token")?.value
//     try{
//         const response=await fetch(process.env.BASE_API+'/forms',{
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
//         })
//         const data=await response.json()
//         return {
//             msg:"success",
//             data:data.forms
//         }
//     }catch(error){
//         console.log(error)
//         return {
//             msg:"error"
//         }
//     }
// }

export const createForm = async (
  title: string,
  description: string
): Promise<ApiResponse<Form> | null> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(process.env.BASE_API + "/forms", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const responseData = await response.json();
    revalidatePath("/dashboard");
    return responseData;
  } catch (error) {
    return null;
  }
};


export const deleteForm=async (id:string):Promise<ApiResponse<Form>|null> =>{
    const token=cookies().get("token")?.value
    try {
        const response=await fetch(process.env.BASE_API+`/forms/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        })
        const responseData:ApiResponse<Form>=await response.json()

        revalidatePath('/dashboard')
        return responseData
    } catch (error) {
        return null
    }
}

// export const getForm=async (id:string):Promise<ApiResponse<IForm>> =>{
//     const token=cookies().get("token")?.value
//     try {
//         const response=await fetch(process.env.BASE_API+`/forms/${id}`,{
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
//         })
//         const res_data=await response.json()

//         return {
//             msg:"success",
//             data:res_data.form
//         }
//     } catch (error) {
//         return {
//             msg:"error"
//         }
//     }
// }

// export const saveForm=async (form:IForm):Promise<ApiResponse<IForm>> =>{
//     const token=cookies().get("token")?.value
//     type SerializedForm=Pick<IForm,'title'| 'description'|'fields'>
//     const serialized:SerializedForm={...form}
//     try {
//         const response=await fetch(process.env.BASE_API+`/forms/${form.id}`,{
//             method:"PUT",
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
//             body:JSON.stringify({"form":{...serialized}})
//         })
//         const res_data=await response.json()

//         revalidatePath(`/forms/${form.id}`)
//         return {
//             msg:"success",
//             data:res_data.form
//         }
//     } catch (error) {
//         return {
//             msg:"error"
//         }
//     }
// }



// export const createSubmission=async (formId:string,answers:IAnswer[]):Promise<ApiResponse<ISubmission>> =>{
//     const token=cookies().get("token")?.value
//     try {
//         const response=await fetch(process.env.BASE_API+`/forms/${formId}/submit`,{
//             method:"POST",
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
//             body:JSON.stringify(answers)
//         })
//         const res_data=await response.json()

//         revalidatePath('/dashboard')
//         return {
//             msg:"success",
//             data:res_data.response
//         }
//     } catch (error) {
//         return {
//             msg:"error"
//         }
//     }
// }
