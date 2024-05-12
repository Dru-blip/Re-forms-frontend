import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon } from "lucide-react";
import FormContext from "@/context/form-context";
import { createQuestions } from "@/lib/actions/questions";
import { toast } from "sonner";



export default function FormSaveButton() {
    const {form,formQuestions,deletedQuestions}=useContext(FormContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick=async ()=>{
        setIsLoading(true)
        let res = await createQuestions(form.id, [...formQuestions],[...deletedQuestions])
        if (res.msg === "error") {
            toast.error("Error saving form")
        } else {
            toast.success("form saved")
        }
        setIsLoading(false)
    }
    return (
        <Button disabled={isLoading} variant={"ghost"} onClick={onClick} className="hover:underline">
            {
                isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>
            }

            Save Draft
        </Button>
    )
}