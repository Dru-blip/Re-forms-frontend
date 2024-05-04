

"use client"

import { Loader2Icon, Plus, SaveIcon } from "lucide-react"
import { Button } from "./ui/button"
import { IForm, IQuestion } from "@/types"
import { useContext, useEffect, useState } from "react"
import FormContext from "@/context/form-context"
// import { Card, CardHeader } from "./ui/card"
// import { Label } from "./ui/label"
import { saveForm } from "@/lib/actions/form"
// import { Input } from "./ui/input"
import QuestionCard from "./question-card"
import { Reorder } from "framer-motion"

interface Props {
    formData: IForm
}

export default function FormEditor({ formData }: Props) {
    const { form, setForm } = useContext(FormContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<IQuestion[]>([])

    useEffect(() => {
        setForm(formData)
        setQuestions(Array.from(formData.questions.values()))
    }, [setForm])

    const addQuestion = () => {
        const qid = Math.round((Math.random() + 1) * 1000)
        formData.questions.set(qid, { id: qid, name: "Question", type: "short" })
        setForm({ ...formData, questions: formData.questions })
        setQuestions(Array.from(formData.questions.values()))
    }

    const deleteQuestion=(id:number)=>{
        formData.questions.delete(id)
        setForm({ ...formData, questions: formData.questions })
        setQuestions(Array.from(formData.questions.values()))
    }

    const onSaveForm = async () => {
        setIsLoading(true)
        const updatedForm:IForm={...form,fields:JSON.stringify(questions)}
        const res = await saveForm(updatedForm)
        if (res.msg) {

        }
        setIsLoading(false)
    }
    const renderQuestions = () => {
        return (
            <Reorder.Group className="grid grid-cols-1 gap-3" values={questions} onReorder={setQuestions}>
                {
                    questions.map((val) => (
                        <Reorder.Item key={val.id} value={val} >
                            <QuestionCard question={val} deleteQuestion={deleteQuestion}/>
                        </Reorder.Item>
                    ))
                }
            </Reorder.Group>

        )

    }
    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center">
                <Button onClick={addQuestion}>
                    <Plus className="mr-2 w-4 h-4" />
                    New Question
                </Button>
                <Button onClick={onSaveForm}>
                    {
                        isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <SaveIcon className="mr-2 w-4 h-4" />
                    }

                    Save
                </Button>
            </div>
            <div >
                {
                    questions ? renderQuestions() : <></>
                }
            </div>
        </div>
    )
}