"use client"

import { IAnswer, IForm, IQuestion, ISubmission } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import ShortAnswer from "./short";
import LongAnswer from "./long";
import MultiAnswer from "./multi";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { createSubmission } from "@/lib/actions/form";
import { Loader2Icon } from "lucide-react";


interface Props {
    form: IForm,
    questions: IQuestion[]
}

export default function FormSubmission({ form, questions }: Props) {
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onSumbit = async () => {
        setIsLoading(true)


        // let submission = { formId: form.id, response: JSON.stringify(answers) }
        // console.log(answers)
        // console.log(answers)
        const res = await createSubmission(form.id, answers)
        if (res.msg === "success") {
            console.log(res.data)
        }
        setIsLoading(false)
    }
    const renderQuestion = (question: IQuestion) => {
        switch (question.type) {
            case "short": {
                return (
                    <ShortAnswer question={question} answers={answers} setAnswers={setAnswers} />
                )
            }
            case "long": {
                return (
                    <LongAnswer question={question} answers={answers} setAnswers={setAnswers} />
                )
            }
            case "multi": {
                return (
                    <MultiAnswer question={question} answers={answers} setAnswers={setAnswers} />
                )
            }
            default:{
                return <></>
            }
        }
    }
    return (
        <div className="container py-8 grid grid-cols-1 gap-3 items-center justify-center">
            <Card className="grid w-full grid-cols-1 gap-3 justify-start pb-4 p-3">
                <h1 className="text-4xl font-semibold  text-primary">
                    {form.title}
                </h1>
                <p className="text-red-500 font-thin ">* indicated required question</p>
            </Card>

            <form onSubmit={onSumbit} className="grid grid-cols-3 gap-3 ">
                <div className="grid grid-cols-1 col-span-3 gap-4 ">
                    {
                        questions ? questions.map((question) => (
                            <Card key={question.id}>
                                {
                                    renderQuestion(question)
                                }
                            </Card>


                        )) : <></>
                    }
                </div>
                <Button disabled={isLoading} type={"submit"}>
                    {
                        isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>
                    }
                    Submit
                </Button>
            </form>

        </div>
    )
}