import { getQuestions } from "@/lib/actions/questions"
import { getAnswersByQuestion } from "@/lib/actions/submissions"
import { IAnswer, IQuestion } from "@/types"
import SummaryClient from "./summary-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import PieChartComponent from "./charts/pie-chart-component"
import BarChartComponent from "./charts/bar-chart-component"


type QuestionAnswer = { question: IQuestion, values: IAnswer[] }[]

export default async function Summary({ id }: { id: string }) {
    const questions = await getQuestions(id)

    const getAnswers = async () => {
        let answers: QuestionAnswer = []
        for (let question of questions.data!) {
            let answer: { question: IQuestion, values: IAnswer[] } = { question, values: [] }
            let data = await getAnswersByQuestion(id, question.id as string)
            answer.values = data.data!
            answers.push(answer)
        }
        return answers
    }
    let answers = await getAnswers()

    const renderQuestionSummary=(question:IQuestion,values:IAnswer[])=>{
        switch(question.type){
            case "short":
            case "long":{
               return values ? values.map((value, ind) => (
                    <div className="bg-accent p-2 rounded-md" key={ind}>{value.value?.join(",")}</div>
                )) : <></>
            }
            case "multi":{
                return <PieChartComponent options={question.options!} values={values}/>
            }
            case "checkbox":{
                return <BarChartComponent options={question.options!} values={values}/>
            }
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {
                answers.map(({ question, values }, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                {question.name}
                            </CardTitle>
                            <CardDescription>
                                <span>
                                    {values.length} responses
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-2">
                            {
                                renderQuestionSummary(question,values)
                            }
                        </CardContent>
                    </Card>
                ))
            }
            <SummaryClient answers={answers} />
        </div>
    )
}