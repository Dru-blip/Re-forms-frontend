

"use client"

import { Loader2Icon, Plus, SaveIcon } from "lucide-react"
import { Button } from "../ui/button"
import { IForm, IQuestion } from "@/types"
import { useContext, useEffect, useState } from "react"
import QuestionCard from "./question-card"
import { Reorder } from "framer-motion"
import { createQuestions } from "@/lib/actions/questions"
import { toast } from "sonner"
import FormContext from "@/context/form-context"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Props {
    formData: IForm,
    questions: IQuestion[]
}

export default function FormEditor({ formData, questions }: Props) {
    const { formQuestions, setQuestions } = useContext(FormContext)

    useEffect(() => {
        setQuestions(questions)
        console.log("updated")
    }, [])

    const addQuestion = () => {
        const qid = String(Math.round((Math.random() + 1) * 100000))
        formQuestions.push({ qid: qid, name: "", type: "short", formId: formData.id, options: [], required: false })
        setQuestions([...formQuestions])
    }


    const updateQuestion = (id: string, index: number, question: IQuestion) => {
        formQuestions[index] = question
        setQuestions([...formQuestions])
    }

    const renderQuestions = () => {
        return (
            <div className="grid grid-cols-1 gap-4">
                {
                    formQuestions.map((val, index) => (
                        // <Reorder.Item key={val.qid} value={val}>
                        <QuestionCard key={val.qid} index={index} question={val} updateQuestion={updateQuestion} />
                        // </Reorder.Item>
                    ))
                }
            </div>
        )

    }
    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            {/* <Card className="flex flex-col justify-between py-8 container">
                <Label>Form Title</Label>
                <Input value={formData.title} onChange={(e)=>{

                }}/>
            </Card> */}
            <div >
                {
                    questions ? renderQuestions() : <></>
                }
            </div>
            <Card className=" flex items-center justify-center px-6 py-6">
                <div className="py-8 border-dotted border-4 rounded-xl w-full flex items-center justify-center">
                    <Button onClick={addQuestion} variant={"ghost"}>
                        <Plus className="mr-2 w-4 h-4" />
                        New Question
                    </Button>
                </div>
            </Card>
        </div>
    )
}