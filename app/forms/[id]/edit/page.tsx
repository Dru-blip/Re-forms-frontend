import FormEditor from "@/components/editor/form-editor";
import EditPageHeader from "@/components/editor/header";
import { Button } from "@/components/ui/button";
import { Form} from "@/types";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";


export default async function EditPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col h-full">
            <div className="bg-accent h-full">
                <FormEditor />
            </div>
        </div>
    )
}