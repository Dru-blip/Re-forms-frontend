"use client"

import { IForm } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { format } from 'date-fns'
import { Button } from "../ui/button";
import { BanIcon, EllipsisVertical, Loader2Icon, Trash, Trash2, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { deleteForm } from "@/lib/actions/form";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Props {
    form: IForm
}

export default function FormCard({ form }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick = async () => {
        setIsLoading(true)
        const response = await deleteForm(form.id)
        //  if(response.data){

        //  }
        setIsLoading(false)
    }
    return (
        <Card className="flex justify-between">
            <CardHeader>
                <CardTitle>
                    <Link href={`/forms/${form.id}/edit`} className="hover:underline ">
                        {form.title}
                    </Link>
                </CardTitle>
                <CardDescription>{form.description}</CardDescription>
                <Label>{format(form.createdAt as Date, "PPP")}</Label>
            </CardHeader>
            <CardFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="bg-accent">
                            <Link href={`/forms/${form.id}/responses`}>
                                Responses
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"icon"} variant={"ghost"} className="w-full pl-1 justify-start text-left">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone ,this will permanently delete the form.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <BanIcon className="mr-2 w-4 h-4" />
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive" disabled={isLoading} onClick={onClick}>
                                        {

                                            isLoading ? <Loader2Icon className="mr-2 w-4 h-4" /> : <Trash2 className="mr-2 w-4 h-4" />
                                        }
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    )
}