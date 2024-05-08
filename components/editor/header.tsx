

"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowLeft, Eye } from "lucide-react"
import { Label } from "../ui/label"
import FormSaveButton from "./save-btn"

interface Props {
    id: string,
    title: string
}


export default function EditPageHeader({ id, title }: Props) {
    return (
        <div className="flex items-center justify-between p-2">
            <Link href={'/dashboard'} className="flex items-center">
                <Button variant={"outline"} size={"icon"}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Label className="ml-2">Back</Label>
            </Link>

            <Label className="font-semibold">{title}</Label>

            <div className="flex items-center">
                <FormSaveButton/> 
                <Link className="ml-2" target="_blank" href={`/forms/${id}/live`}>
                    <Button variant={"outline"}>Preview</Button>
                </Link>
                <Button className="ml-2">Share</Button>
            </div>
        </div>
    )
}