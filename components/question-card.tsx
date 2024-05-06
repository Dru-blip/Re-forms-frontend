"use client"

import { IForm, IQuestion, QuestionType } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import { useContext } from "react";
import FormContext from "@/context/form-context";
import { Button } from "./ui/button";
import { Trash2, X } from "lucide-react";



interface Props {
    question: IQuestion,
    deleteQuestion: (id: string) => void,
    updateQuestion:(id:string,question:IQuestion)=>void
}

export default function QuestionCard({ question, deleteQuestion,updateQuestion}: Props) {
    // const { form, setForm } = useContext(FormContext)
    const renderQuestion = () => {
        switch (question.type) {
            case "short": {
                return (
                    <div>Short answer text</div>
                )
            }
            case "long": {
                return (
                    <div>Long answer text</div>
                )
            }
            default: {
                return (
                    <div className="grid grid-cols-1 gap-4  p-2">
                        {
                            question.options ? question.options.map((option, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <Input value={option} onChange={(e) => {
                                        question.options![index] = e.target.value
                                        updateQuestion(question.qid,question)
                                    }} />
                                    <Button size={"icon"} variant={"ghost"} onClick={() => deleteOption(index)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                            )) : <></>
                        }
                        <Button onClick={addOption}>Add Option</Button>
                    </div>
                )
            }
        }
    }

    const deleteOption = (index: number) => {
        question.options?.splice(index, 1)
        updateQuestion(question.qid,question)
    }

    const addOption = () => {
        if (question.options) {
            question.options.push(`Option ${question.options.length + 1}`)
        } else {
            question.options = [`Option 1`]
        }
        updateQuestion(question.qid,question)
    }
 
    const onQuestionTypeChange = (value: string) => {
        question.type = value as QuestionType
        question.options = []
        updateQuestion(question.qid,question)
    }
    return (
        <Card key={question.id}>
            <CardHeader className="grid grid-cols-3 gap-3 items-baseline">
                <Input className="col-span-2" value={question.name} onChange={(e) => {
                    question.name = e.target.value
                    updateQuestion(question.qid,question)
                }} />
                <Select onValueChange={onQuestionTypeChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={question.type} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="short">short</SelectItem>
                        <SelectItem value="long">long</SelectItem>
                        <SelectSeparator></SelectSeparator>
                        <SelectItem value="multi">multi</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {
                    renderQuestion()
                }
            </CardContent>
            <CardFooter className="flex justify-end items-center">
                <Button size={"icon"} variant={"outline"} onClick={() => deleteQuestion(question.qid)}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}