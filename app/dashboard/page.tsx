
import LogoutButton from "@/components/auth/logout-button";
import CreateFormDialog from "@/components/create-form-dialog";
import FormList from "@/components/editor/form-list";
import { ApiResponse, Form } from "@/types";
import { cookies } from "next/headers";


async function fetchForms() :Promise<Form[]>{
    const token=cookies().get("token")!
    try{
        const response=await fetch(process.env.BASE_API+"/forms",{
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token.value}`
            },
        })
        const responseData:ApiResponse<Form[]>=await response.json()
        return responseData.data
    }catch(err){
        return []
    }
}

export default async function Dashboard() {
    // const forms = await getAllForms()
    const forms:Form[]=await fetchForms()
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            <div className="flex items-center justify-end p-2">
                <LogoutButton/>
            </div>
            <div className="w-full bg-accent py-8">
                <div className="container grid grid-cols-1 gap-4 items-center justify-start">
                    <h1 className="text-lg font-semibold">Start a new Form</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        <CreateFormDialog />
                    </div>
                </div>
            </div>
            <div className="container py-8 grid grid-cols-1 gap-3">
                <h1 className="text-lg font-semibold">Recent Forms</h1>
                <FormList forms={forms} />
            </div>
        </div>
    )
}