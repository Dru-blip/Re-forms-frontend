

"use client"

import { Loader2Icon, Plus, SaveIcon } from "lucide-react"
import { Button } from "./ui/button"
import { IForm, IQuestion } from "@/types"
import { useContext, useEffect, useRef, useState } from "react"
import FormContext from "@/context/form-context"
// import { Card, CardHeader } from "./ui/card"
// import { Label } from "./ui/label"
import { saveForm } from "@/lib/actions/form"
// import { Input } from "./ui/input"
import QuestionCard from "./question-card"
import { Reorder } from "framer-motion"
import { createQuestions } from "@/lib/actions/questions"

interface Props {
    formData: IForm,
    questions:IQuestion[]
}

export default function FormEditor({ formData,questions }: Props) {
    // const { form, setForm } = useContext(FormContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formQuestions, setQuestions] = useState<IQuestion[]>([])

    useEffect(() => {
        // setForm(formData)
        setQuestions(questions)
        // console.log(questions)
    })

    const addQuestion = () => {
        const qid = String(Math.round((Math.random() + 1) * 100000))
        formQuestions.push({qid:qid,name:"Question",type:"short",formId:formData.id,options:[]})
        setQuestions([...formQuestions])
        // console.log(questions)
    }

    const deleteQuestion=(id:string)=>{
        
        formQuestions.filter((question,index)=>{         
            if(question.qid===id){
                let questions=formQuestions.splice(index,1)
                setQuestions([...questions])
            }
        })

    }

    const updateQuestion=(id:string,question:IQuestion)=>{
        const filetered=formQuestions.filter((question)=>(question.qid!==id))
        setQuestions([...filetered,question])
    }

    const onSaveForm = async () => {
        setIsLoading(true)
        // const updatedForm:IForm={...form,fields:JSON.stringify(questions)}
        // const res = await saveForm(updatedForm)
        // if (res.msg) {

        // }
        // console.log(questions)
        await createQuestions(formData.id,[...questions])
        // console.log(questions)
        setIsLoading(false)
    }
    const renderQuestions = () => {
        return (
            <Reorder.Group className="grid grid-cols-1 gap-3" values={questions} onReorder={setQuestions}>
                {
                    formQuestions.map((val) => (
                        <Reorder.Item key={val.qid} value={val} >
                            <QuestionCard question={val} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion}/>
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