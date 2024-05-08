import FormSubmission from "@/components/submission/form-submission"
import { getForm } from "@/lib/actions/form"
import { getQuestions } from "@/lib/actions/questions"
import { IForm, IQuestion } from "@/types"


export default async function SubmitPage({ params }: { params: { id: string } }) {
    const form = await getForm(params.id)
    const questions=await getQuestions(params.id)


    return (
        <div className="container py-8">
            <FormSubmission form={{...form.data} as IForm} questions={questions.data as IQuestion[]}/>
        </div>
    )
}