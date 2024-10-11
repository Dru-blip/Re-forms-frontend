"use client"

import * as formActions from "@/lib/actions/form";
import { Form } from "@/types";
import { format } from 'date-fns';
import { BanIcon, BarChart2Icon, Edit2Icon, Loader2Icon, LucideEye, Settings2Icon, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface Props {
    form: Form
}

export default function FormCard({ form }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick = async () => {
        setIsLoading(true)
        const response = await formActions.deleteForm(form.id)
        setIsLoading(false)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link href={`/forms/${form.id}/edit`} className="hover:underline ">
                        {form.title}
                    </Link>
                </CardTitle>
                <CardDescription>{form.description}</CardDescription>
                <Label>{format(form.createdAt as Date, "PPP")}</Label>
            </CardHeader>
            <Separator />
            <CardFooter className="flex items-center justify-end p-2">
                <Link href={`/forms/${form.id}/edit`}>
                    <Button variant={"ghost"} size={"icon"}>
                        <Edit2Icon className="w-5 h-5" />
                    </Button>
                </Link>
                <Link href={`/forms/${form.id}/responses/table`}>
                    <Button variant={"ghost"} size={"icon"}>
                        <BarChart2Icon />
                    </Button>
                </Link>
                <Link href={`/forms/${form.id}/live`} target="_blank">
                    <Button variant={"ghost"} size={"icon"}>
                        <LucideEye className="w-5 h-5" />
                    </Button>
                </Link>

                <Link href={`/forms/${form.id}/edit/settings/defaults`}>
                    <Button variant={"ghost"} size={"icon"}>
                        <Settings2Icon className="w-5 h-5" />
                    </Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Trash className="w-5 h-5" />
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

                                    isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <Trash2 className="mr-2 w-4 h-4" />
                                }
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}