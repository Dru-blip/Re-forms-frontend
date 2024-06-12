"use client"

import { Loader2Icon, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { IForm, IQuestion, ISettings } from "@/types"
import { useContext, useEffect, useState } from "react"
import QuestionCard from "./question-card"
import { createQuestion, createQuestions } from "@/lib/actions/questions"
import { toast } from "sonner"
import FormContext from "@/context/form-context"
import { Card } from "../ui/card"
import { getRandomNumber } from "@/lib/utils"

interface Props {
    formData: IForm,
    questions: IQuestion[]
    setting:ISettings
}

export default function FormEditor({ formData, questions ,setting}: Props) {
    const { formQuestions, setQuestions,setSettings } = useContext(FormContext)
    const [isLoading,setIsLoading]=useState<boolean>(false)

    useEffect(() => {
        setQuestions(questions)
        setSettings(setting)
    }, [])

    const addQuestion = async () => {
        setIsLoading(true)
        const qid = getRandomNumber()
        let new_q:IQuestion={ qid: qid, name: "", type: "short", formId: formData.id, options: [], required:setting.questionsRequiredDefault }
        
        let data=await createQuestion(formData.id,new_q)
        if(data.msg==='success'){
            formQuestions.push(data.data!)
            setQuestions([...formQuestions])
        }
        setIsLoading(false)
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
                        <QuestionCard key={val.qid} index={index} question={val} updateQuestion={updateQuestion} />
                    ))
                }
            </div>
        )

    }
    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            <div >
                {
                    questions ? renderQuestions() : <></>
                }
            </div>
            <Card className=" flex items-center justify-center px-6 py-6">
                <div className="py-8 border-dotted border-4 rounded-xl w-full flex items-center justify-center">
                    <Button onClick={addQuestion} variant={"ghost"} disabled={isLoading}>
                        {
                            isLoading?<Loader2Icon className="mr-2 w-4 h-4 animate-spin"/>:<Plus className="mr-2 w-4 h-4" />
                        }
                        New Question
                    </Button>
                </div>
            </Card>
        </div>
    )
}