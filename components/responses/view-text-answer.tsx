import { Answer } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


interface Props{
    answer:Answer
}

export default function ViewTextAnswer({answer}:Props) {
   return (
        <Card>
            <CardHeader>
                <CardTitle>{answer.question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{answer.text}</p>
            </CardContent>
        </Card>
   ) 
}