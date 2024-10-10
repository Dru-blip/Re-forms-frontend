"use client";

import { saveAs } from "file-saver";
import { ArrowLeft, DownloadIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import LinkCard from "../nav/link-card";
import { Button } from "../ui/button";
import DeleteResponseDialog from "./delete-responses-dialog";
import { useContext, useState } from "react";
import FormContext from "@/context/form-context";

export default function Header({ formId }: { formId: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { formDetails } = useContext(FormContext);
    return (
        <div className="flex items-center justify-between p-3">
            <Link href={`/forms/${formId}/edit`} className="flex items-center w-[100px]">
                <Button size={"icon"} variant={"outline"} className="mr-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                Editor
            </Link>
            <div className="flex items-center gap-4">
                <LinkCard href={`/forms/${formId}/responses/table`} name="Table" />
                {/* <LinkCard href={`/forms/${formId}/responses/summary`} name="Summary" /> */}
                <LinkCard href={`/forms/${formId}/responses/individual?response=1`} name="Individual" />
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant={"outline"}
                    onClick={async () => {
                        setIsLoading(true);
                        try {
                            const res = await fetch(`/api/${formId}/responses/download`);
                            const blob = await res.blob();
                            saveAs(blob, `${formDetails.title}.xlsx`);
                        } catch (err) {}
                        setIsLoading(false);
                    }}
                >
                    {isLoading ? (
                        <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                    ) : (
                        <DownloadIcon className="mr-2 w-4 h-4" />
                    )}
                    Download responses
                </Button>
                <DeleteResponseDialog formId={formId} />
            </div>
        </div>
    );
}
