import FormSubmission from "@/components/form-submission"
import { getForm } from "@/lib/actions/form"
import { IForm, IQuestion } from "@/types"


export default async function SubmitPage({ params }: { params: { id: string } }) {
    const form = await getForm(params.id)
    const parseForm=()=>{
        let questionMap:Map<number,IQuestion> = new Map()
        let questions=JSON.parse(form.data?.fields as string) as IQuestion[]

        if(questions.length){
            for(let question of questions){
                questionMap.set(question.id,question)
            }
        }
        return questionMap
    }
    const questionMap=parseForm()
    return (
        <div className="container py-8">
            <FormSubmission form={{...form.data,questions:questionMap} as IForm}/>
        </div>
    )
}