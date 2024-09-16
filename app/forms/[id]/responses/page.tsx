import DeleteResponseDialog from "@/components/responses/delete-responses-dialog"
import ResponseTable from "@/components/responses/response-table"
import Summary from "@/components/responses/summary"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getQuestions } from "@/lib/actions/questions"
import { getAnswers, getSubmissions } from "@/lib/actions/submissions"
import { IAnswer, IQuestion } from "@/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"





export default async function Responses({ params }: { params: { id: string } }) {
    const submissions = await getSubmissions(params.id)
    const questions = await getQuestions(params.id)

    const getAnswersBySubmissions = async () => {
        let answers: any[] = []
        if (submissions.data?.length) {
            for (let submission of submissions.data!) {
                let answer: { date: Date, values: IAnswer[] } = { date: submission.date, values: [] }
                let data = await getAnswers(params.id, submission.id as string)
                answer.values = data.data!
                answers.push(answer)
            }
        }

        return answers
    }


    // await getSubmissionAnswers()
    const answers = await getAnswersBySubmissions()

    return (
        <div className="p-3 flex flex-col ">
            <Link href={`/forms/${params.id}/edit`} className="flex items-center w-[100px]">
                <Button size={"icon"} variant={"outline"} className="mr-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                Editor
            </Link>
            <div className="container grid grid-cols-3 gap-4">
                <Card >
                    <CardHeader>
                        <CardTitle>
                            Total submissions : {submissions.data?.length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <DeleteResponseDialog formId={params.id} />
            </div>

            <Tabs defaultValue="table" className="container">
                <TabsList className="w-full flex items-center mt-2">
                    <TabsTrigger className="w-full" value="table">Table</TabsTrigger>
                    <TabsTrigger className="w-full" value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="table">
                    <ResponseTable header={questions.data as IQuestion[]} responses={answers as { date: Date, values: IAnswer[] }[]} />
                </TabsContent>
                <TabsContent value="summary">
                    <Summary id={params.id} />
                </TabsContent>
            </Tabs>
        </div>

    )
}