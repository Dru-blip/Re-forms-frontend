import FormSubmission from "@/components/form-submission"
import { getForm } from "@/lib/actions/form"
import { getQuestions } from "@/lib/actions/questions"
import { IForm, IQuestion } from "@/types"


export default async function SubmitPage({ params }: { params: { id: string } }) {
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
    return (
        <div className="container py-8">
            <FormSubmission form={{...form.data} as IForm} questions={questions.data as IQuestion[]}/>
        </div>
    )
}