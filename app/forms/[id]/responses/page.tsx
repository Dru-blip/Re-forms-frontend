import FormResponses from "@/components/form-responses"
import { getQuestions } from "@/lib/actions/questions"
import { getAnswers, getSubmissions } from "@/lib/actions/submissions"
import { IAnswer, IQuestion, ISubmission } from "@/types"




export default async function Responses({params}:{params:{id:string}}) {
    const data=await getSubmissions(params.id)
    const questions=await getQuestions(params.id)
    const getSubmissionAnswers=async ()=>{
        let answers:any[]=[]
        for(let submission of data.data!){
            let answer:{date:Date,values:IAnswer[]}={date:submission.date,values:[]}
            let data=await getAnswers(params.id,submission.id as string)
            answer.values=data.data!
            answers.push(answer)        
        }

        return answers
    }
    // await getSubmissionAnswers()
    const answers=await getSubmissionAnswers()
    // console.log(answers)
    return (
        <div>
            <FormResponses  submissions={data.data! as ISubmission[]} responses={answers as {date:Date,values:IAnswer[]}[] } header={questions.data as IQuestion[]}/>
        </div>
    )
}