"use client"

import { Loader2Icon, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { deleteSubmissions } from "@/lib/actions/submissions";
import { toast } from "sonner";



export default function DeleteResponseDialog({formId}:{formId:string}) {
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const onClick=async ()=>{
        setIsLoading(true)
        const res=await deleteSubmissions(formId)
        if(res.msg==="error"){
            toast.error("Cannot delete responses try again")
        }
        else{
            toast.success("responses deleted successfully")
        }
        setIsLoading(false)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"}><Trash2 className="mr-2 w-5 h-5" /> Delete All Responses</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Responses</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete all responses, this action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive" disabled={isLoading} onClick={onClick}>
                        {

                            isLoading ? <Loader2Icon className="mr-2 w-4 h-4" /> : <Trash2 className="mr-2 w-4 h-4" />
                        }
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}