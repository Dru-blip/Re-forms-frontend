import { IAnswer, IQuestion } from "@/types"
import { Label } from "@radix-ui/react-label"

import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"



interface Props{
    question:IQuestion,
    answers:IAnswer[],
    setAnswers:Dispatch<SetStateAction<IAnswer[]>>
}

export default function LongAnswer({question,answers,setAnswers}:Props){
    return (
        <Card className="p-4">
            <Label>{question.name}</Label>
            <Textarea placeholder="Your Answer" onChange={(e)=>{
                 const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
                 setAnswers([...newAnswers, {
                     questionId: question.id as string, name: question.name, value: [e.target.value], type: question.type,
                     submissionId: ""
                 }])
            }}></Textarea>
        </Card>
    )
}