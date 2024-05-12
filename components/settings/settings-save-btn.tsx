"use client"

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import FormContext from "@/context/form-context";
import { saveSettings } from "@/lib/actions/settings";
import { toast } from "sonner";



export default function SaveSettingsButton(){
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const {settings}=useContext(FormContext)
    const onClick=async ()=>{
        setIsLoading(true)
        const res=await saveSettings(settings.formId,settings.id,settings)
        if(res.msg==="success"){
            toast("settings updated")
        }
        else{
            toast("unable to save settings")
        }
        setIsLoading(false)
    }
    return (
        <Button disabled={isLoading} onClick={onClick}>
            {
                isLoading?<Loader2 className="mr-2 w-4 h-4 animate-spin"/> :<></>
            }
            Save
        </Button>
    )
}