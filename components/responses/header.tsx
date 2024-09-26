import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import LinkCard from "../nav/link-card";
import DeleteResponseDialog from "./delete-responses-dialog";

export default function Header({formId}:{formId:string}) {
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
                <LinkCard href={`/forms/${formId}/responses/summary`} name="Summary" />
                <LinkCard href={`/forms/${formId}/responses/individual?response=1`} name="Individual" />
            </div>
            <div>
                <DeleteResponseDialog formId={formId} />
            </div>
        </div>
    );
}
