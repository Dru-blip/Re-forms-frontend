import FormEditor from "@/components/editor/form-editor";
import EditPageHeader from "@/components/editor/header";
import { Button } from "@/components/ui/button";
import { getForm } from "@/lib/actions/form";
import { getQuestions } from "@/lib/actions/questions";
import { getSetting } from "@/lib/actions/settings";
import { IForm, IQuestion } from "@/types";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";


export default async function EditPage({ params }: { params: { id: string } }) {
    const form = await getForm(params.id)
    const questions=await getQuestions(params.id)
    const setting=await getSetting(params.id)

    return (
        <div className="flex flex-col h-full">
            <div className="bg-accent h-full">
                <FormEditor setting={setting.data!} formData={{ ...form.data}  as IForm}  questions={questions.data as IQuestion[]}/>
            </div>
        </div>
    )
}