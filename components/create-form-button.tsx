

"use client"

import { useState } from "react"
// import FormContext from "@/context/form-context"
import { Form } from "@/types"
import { Button } from "./ui/button"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { createForm } from "@/lib/actions/form"
import { useRouter } from "next/navigation"


export default function CreateFormButton() {
    // const { forms, setForms } = useContext(FormContext)
    const router=useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick = async () => {
        setIsLoading(true)
        // setForms([...forms, newForm])
        const form=await createForm()
        
        if(form.data){
            router.push(`/forms/${form.data.id}/edit`)
        }
        
        setIsLoading(false)
    }
    return (
        <Button onClick={onClick} disabled={isLoading}>
            {isLoading ?
                <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <PlusIcon className="mr-2 w-4 h-4" />
            }
            New Form
        </Button>
    )
}