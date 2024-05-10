

"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowLeft, ChevronDown, Eye, Settings2Icon } from "lucide-react"
import { Label } from "../ui/label"
import FormSaveButton from "./save-btn"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { AngleIcon } from "@radix-ui/react-icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

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
                <Label className="ml-2">Dashboard</Label>
            </Link>
            <div className="flex ">
                <Link href={"/dashboard"} className="hover:underline">Drafts/</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <p className="hover:underline flex items-center">
                            {title}
                            <ChevronDown className="w-4 h-4" />
                        </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href={`/forms/${id}/responses`}>
                                    View Responses
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className="flex items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"ghost"}>
                            <Settings2Icon className="mr-2 w-4 h-4" />
                            Settings
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Settings</DialogTitle>
                        </DialogHeader>
                        
                    </DialogContent>
                </Dialog>

                <FormSaveButton />
                <Link className="ml-2" target="_blank" href={`/forms/${id}/live`}>
                    <Button variant={"outline"}>Preview</Button>
                </Link>
                <Button className="ml-2">Share</Button>
            </div>
        </div>
    )
}