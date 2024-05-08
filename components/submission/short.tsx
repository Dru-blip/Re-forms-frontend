import { IAnswer, IQuestion } from "@/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../ui/card";


interface Props {
    question: IQuestion,
    answers: IAnswer[],
    setAnswers: Dispatch<SetStateAction<IAnswer[]>>
}

export default function ShortAnswer({ question, setAnswers, answers }: Props) {
    return (
        <div className="flex flex-col p-4 gap-4 justify-start">
            <Label className="font-semibold text-md leading-3">{question.name}{question.required ? <span className="text-red-600">*</span> : <></>}</Label>
            <Input required={question.required} placeholder="Your Answer" onChange={(e) => {
                const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
                setAnswers([...newAnswers, {
                    questionId: question.id as string, name: question.name, value: [e.target.value], type: question.type,
                    submissionId: "",
                }])
            }} />
        </div>
    )
}