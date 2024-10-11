"use client"

import { ArrowLeft, ChevronDown, EllipsisVertical, Settings2Icon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Label } from "../ui/label"
import FormSaveButton from "./save-btn"
import { Card } from "../ui/card"

interface Props {
    id: string,
    title: string
}


export default function EditPageHeader({ id, title }: Props) {
    return (
        <Card className="flex items-center justify-between p-2 w-full fixed rounded shadow-md">
            <Link href={'/dashboard'} className="flex items-center">
                <Button variant={"outline"} size={"icon"}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Label className="ml-2">Dashboard</Label>
            </Link>
            <div className="lg:flex hidden">
                {/* <Link href={`/forms/${id}/edit`} className="hover:underline">Drafts/</Link> */}
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
                                <Link href={`/forms/${id}/responses/table`}>
                                    View Responses
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className="lg:flex lg:items-center hidden">
                <Link href={`/forms/${id}/edit/settings/defaults`}>
                    <Button variant={"ghost"}>
                        <Settings2Icon className="mr-2 w-4 h-4" />
                        Settings
                    </Button>
                </Link>
                {/* <FormSaveButton /> */}
                <Link className="ml-2" target="_blank" href={`/forms/${id}/live`}>
                    <Button variant={"outline"}>Preview</Button>
                </Link>
                <Button className="ml-2">Share</Button>
            </div>
            <div className="lg:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"outline"}>
                            <EllipsisVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col">
                        <FormSaveButton />
                        <DropdownMenuItem>
                            <Link href={`/forms/${id}/edit/settings/default`} className="flex items-center">
                                <Settings2Icon className="mr-2 w-4 h-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}