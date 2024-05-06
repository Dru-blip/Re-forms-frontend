import FormEditor from "@/components/form-editor";
import { Button } from "@/components/ui/button";
import { getForm } from "@/lib/actions/form";
import { getQuestions } from "@/lib/actions/questions";
import { IForm, IQuestion } from "@/types";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";


export default async function EditPage({ params }: { params: { id: string } }) {
    const form = await getForm(params.id)
    const questions=await getQuestions(params.id)
    // const parseForm=()=>{
    //     let questionMap:Map<number,IQuestion> = new Map()
    //     let questions=JSON.parse(form.data?.fields as string) as IQuestion[]

    //     if(questions.length){
    //         for(let question of questions){
    //             questionMap.set(question.id,question)
    //         }
    //     }
    //     return questionMap
    // }

    // const questionMap=parseForm()
    // console.log(questions)
    // console.log(form.)
    return (
        <div className="flex flex-col container py-8">
            <div className="flex items-center justify-between">
                <Link href={"/dashboard"}>
                    <Button>
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Dashboard
                    </Button>
                </Link>
                <Link target="_blank" href={`/forms/${params.id}/live`}>
                    <Button><Eye className="mr-2 w-4 h-4"/> Preview</Button>
                </Link>
            </div>
            <div>
                <FormEditor formData={{ ...form.data}  as IForm}  questions={questions.data as IQuestion[]}/>
            </div>
        </div>
    )
}