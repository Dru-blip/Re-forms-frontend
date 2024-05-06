import { IAnswer, IQuestion } from "@/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";


interface Props {
    question: IQuestion,
    answers: IAnswer[],
    setAnswers: Dispatch<SetStateAction<IAnswer[]>>
}

export default function ShortAnswer({ question, setAnswers, answers }: Props) {
    return (
        <div>
            <Label>{question.name}</Label>
            <Input placeholder="Your Answer" onChange={(e) => {
                const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
                setAnswers([...newAnswers, {
                    questionId: question.id as string, name: question.name, value: [e.target.value], type: question.type,
                    submissionId: "",
                    
                }])
            }} />
        </div>
    )
}