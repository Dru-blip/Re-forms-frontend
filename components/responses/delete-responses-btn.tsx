
"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteSubmissions } from "@/lib/actions/submissions";
import { toast } from "sonner";


export default function DeleteResponsesButton({formId}:{formId:string}){
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const onClick=async ()=>{
        setIsLoading(true)
        const res=await deleteSubmissions(formId)
        if(res.msg==="error"){
            toast.error("Cannot delete responses try again")
        }
        else{
            toast("responses deleted successfully")
        }
        setIsLoading(false)
    }
    return (
        <Button onClick={onClick} disabled={isLoading} variant={"outline"}>
            {
                isLoading?<Loader2 className="mr-2 w-4 h-4 animate-spin"/>:<Trash2 className="mr-2 w-4 h-4"/>
            }
            Delete All Responses
        </Button>
    )
}