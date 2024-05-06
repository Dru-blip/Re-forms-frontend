import { IAnswer, IQuestion } from "@/types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../ui/card";



interface Props{
    question:IQuestion,
    answers:IAnswer[],
    setAnswers:Dispatch<SetStateAction<IAnswer[]>>
}

export default function MultiAnswer({ question , answers,setAnswers }:Props) {
    const [answer, setAnswer] = useState<string>(question.options?.at(0) as string)
    return (
        <Card className="p-2">
            <RadioGroup value={answer} onValueChange={(val)=>{
                const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
                setAnswer(val)
                setAnswers([...newAnswers, {
                    questionId: question.id as string, name: question.name, value: [val], type: question.type,
                    submissionId: ""
                }])
            }}>
                <Label>{question.name}</Label>
                {question.options?.map((value, ind) => (
                    <div key={ind} className="flex items-center">
                        <RadioGroupItem value={value} />
                        <Label>{value}</Label>
                    </div>
                ))}
            </RadioGroup>
        </Card>

    )
}