
import { Question } from "@/types"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import BarChartComponent from "./charts/bar-chart-component"
import PieChartComponent from "./charts/pie-chart-component"
import SummaryClient from "./summary-client"



const fetchFormSummary=async (id:string)=>{
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${id}/summaries`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
}

export default async function Summary({ id }: { id: string }) {
    // const questions = await getQuestions(id)
    const summary:Question[]=await fetchFormSummary(id)

    // const getAnswers = async () => {
    //     let answers: QuestionAnswer = []
    //     if (questions.data?.length) {
    //         for (let question of questions.data!) {
    //             let answer: { question: IQuestion, values: IAnswer[] } = { question, values: [] }
    //             let data = await getAnswersByQuestion(id, question.id as string)
    //             answer.values = data.data!
    //             answers.push(answer)
    //         }
    //     }

    //     return answers
    // }
    // let answers = await getAnswers()

    
    const renderQuestionSummary = (question: Question) => {
        switch (question.type) {
            case "MULIT_CHOICE": {
                return <PieChartComponent options={question.options!} />
            }
            case "CHECKBOX": {
                return <BarChartComponent options={question.options!} />
            }
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {
                summary.map((question,index)=>(
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                {question.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-2">
                            {
                                renderQuestionSummary(question)
                            }
                        </CardContent>
                    </Card>
                ))
            }
            {/* {
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
                                renderQuestionSummary(question, values)
                            }
                        </CardContent>
                    </Card>
                ))
            } */}
            <SummaryClient answers={summary}/>
            
        </div>
    )
}