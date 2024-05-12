
"use client"

import { IQuestion, IAnswer } from "@/types"
import { Dispatch, SetStateAction, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Check, CheckCircle2, Circle, Square, SquareCheck } from "lucide-react"


interface Props {
    question: IQuestion,
    answers: IAnswer[],
    setAnswers: Dispatch<SetStateAction<IAnswer[]>>
}

export default function CheckboxAnswers({ question, answers, setAnswers }: Props) {
    // const [answer, setAnswer] = useState<string>("")
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const onSelect = (index: number) => {
        let found = selectedItems.findIndex((i) => i === index)
        if (found !== -1) {
            selectedItems.splice(found, 1)
            setSelectedItems([...selectedItems])
        } else {
            selectedItems.push(index)
            setSelectedItems([...selectedItems])
        }

        let ans = selectedItems.map((item) => {
            return question.options?.at(item) as string
        })

        const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
        setAnswers([...newAnswers, {
            questionId: question.id as string, name: question.name, value: [...ans], type: question.type,
            submissionId: "",
        }])
    }

    const isSelected = (index: number) => {
        return selectedItems.findIndex((i) => i === index) !== -1 ? true : false
    }

    return (
        <Card className="py-6 px-4">
            <CardHeader>
                <CardTitle>
                    <span className="font-semibold text-md leading-3">{question.name}{question.required ? <span className="text-red-600">*</span> : <></>}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {

                    question.options ? question.options.map((option, optionIndex) => (
                        <div onClick={() => onSelect(optionIndex)} key={optionIndex} className={isSelected(optionIndex) ? "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between border-2 border-gray-500" : "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between"}>
                            <Label>{option}</Label>
                            {
                                isSelected(optionIndex) ? <SquareCheck /> : <Square />
                            }
                           
                        </div>
                    )) : <></>
                }
            </CardContent>
        </Card>

    )
}