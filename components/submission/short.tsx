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
                const newAnswers = answers.filter((ans) => ans.qid !== question.id)
                setAnswers([...newAnswers, { qid: question.id, name: question.name, answers: [e.target.value], type: question.type }])
            }} />
        </div>
    )
}