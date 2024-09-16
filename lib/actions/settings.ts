"use server";

import { ApiResponse, Settings } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export const getSetting=async (id:string):Promise<ApiResponse<Settings>> =>{
//     const token=cookies().get("token")?.value
//     try {
//         const response=await fetch(process.env.BASE_API+`/forms/${id}/settings`,{
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
//         })
//         const res_data=await response.json()

//         return {
//             msg:"success",
//             data:res_data.setting
//         }
//     } catch (error) {
//         return {
//             msg:"error"
//         }
//     }
// }

export const saveSettings = async (setting: Settings) => {
  const token = cookies().get("token")?.value;
  const updatedSettings = {
    confirmationMessage: setting.confirmationMessage,
    responseLimit: setting.responseLimit,
    editResponse: setting.editResponse,
    questionsRequiredDefault: setting.questionsRequiredDefault,
    anotherResponse: setting.anotherResponse,
  };
  try {
    const response = await fetch(
      process.env.BASE_API +
        `/settings/${setting.formId}/setting/${setting.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...updatedSettings }),
      }
    );
    const res_data = await response.json();
    return {
      msg: "success",
      data: res_data.setting,
    };
  } catch (error) {
    return {
      msg: "error",
    };
  }
};
