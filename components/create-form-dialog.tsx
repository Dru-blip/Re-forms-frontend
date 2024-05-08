"use client"
import { Loader2Icon, Plus, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IForm } from "@/types";
import { createForm } from "@/lib/actions/form";
import { Input } from "./ui/input";


export default function CreateFormDialog() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [title,setTitle]=useState<string>("Untitled Form")
    const [description,setDescription]=useState<string>("")
    const onClick = async () => {
        setIsLoading(true)
        const newForm: IForm = {
            id: "",
            title,
            description,
            fields: JSON.stringify([]),
            questions: []
        }
        // setForms([...forms, newForm])
        const form = await createForm(newForm)

        if (form.data) {
            router.push(`/forms/${form.data.id}/edit`)
        }

        setIsLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 w-4 h-4" />New Form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Create New Form</DialogHeader>
                <div className="grid grid-cols-1 gap-4">
                    <Input required placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    <Input placeholder="Enter Description" onChange={(e)=>{setDescription(e.target.value)}}/>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"secondary"}>Close</Button>
                    </DialogClose>
                    <Button onClick={onClick} disabled={isLoading}>
                        {isLoading ?
                            <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <PlusIcon className="mr-2 w-4 h-4" />
                        }
                        New Form
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}