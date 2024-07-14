"use client"

import { IForm, IQuestion, QuestionType } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { useContext, useState } from "react";
import FormContext from "@/context/form-context";
import { Button } from "../ui/button";
import { Circle, CircleDotIcon, CopyIcon, Notebook, NotepadText, Plus, Square, SquareCheck, Trash2, X } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { getRandomNumber } from "@/lib/utils";
import * as actions from "@/lib/actions/questions"



interface Props {
    question: IQuestion,
    index: number,
    updateQuestion: (id: string, index: number, question: IQuestion) => void,
}

export default function QuestionCard({ question, index, updateQuestion }: Props) {
    const { setQuestions, formQuestions, setDeletedQuestions, deletedQuestions } = useContext(FormContext)

   
    const deleteQuestion = async (id: string) => {
        let filtered = formQuestions.filter((question) => {
            if (question.qid !== id) {
                return question
            }
        })

        let data=await actions.deleteQuestion(question.formId,question.id!)
        console.log(data)
        setQuestions([...filtered])
        setDeletedQuestions([...deletedQuestions, question])
    }

    const deleteOption = (ind: number) => {
        question.options?.splice(ind, 1)
        updateQuestion(question.qid, index, question)
    }

    const copyQuestion = async (ind: number) => {
        const newQuestion = {...question,qid: getRandomNumber(), id:""}
        formQuestions.splice(ind, 0, newQuestion)
        setQuestions([...formQuestions])
        let data=await actions.createQuestion(question.formId,newQuestion)
        console.log(data)
    }

    const addOption = () => {
        if (question.options) {
            question.options.push(`Option ${question.options.length + 1}`)
        } else {
            question.options = [`Option 1`]
        }
        updateQuestion(question.qid, index, question)
    }

    const onQuestionTypeChange = async (value: string) => {
        question.type = value as QuestionType
        question.options = []
        updateQuestion(question.qid, index, question)
    }


    const renderQuestionTypeIcon = () => {
        switch (question.type) {
            case "short": {
                return <NotepadText className="w-4 h-4 mr-2" />
            }
            case "long": {
                return <Notebook className="w-4 h-4 mr-2" />
            }
            case "multi": {
                return <CircleDotIcon className="w-4 h-4 mr-2" />
            }
            case "checkbox": {
                return <SquareCheck className="w-4 h-4 mr-2" />
            }
            default: {
                return <></>
            }
        }
    }

    const renderQuestion = () => {
        switch (question.type) {
            case "short":
            case "long": {
                return (
                    <div className="bg-accent rounded-md p-3">{question.type} answer here</div>
                )
            }
            case "multi":
            case "checkbox": {
                return (
                    <div className="grid grid-cols-1 gap-4  p-2">
                        {
                            question.options ? question.options.map((option, ind) => (
                                <div key={ind} className="flex items-center justify-between">
                                    <div className="flex items-center w-full">
                                        {
                                            question.type === "multi" ? <Circle className=" mr-2 w-6 h-6 text-gray-500" /> : <Square className="mr-2 w-6 h-6 text-gray-500" />
                                        }

                                        <Input value={option} onChange={async (e) => {
                                            question.options![ind] = e.target.value
                                            updateQuestion(question.qid, index, question)
                                        }} />
                                    </div>

                                    <Button size={"icon"} variant={"ghost"} onClick={() => deleteOption(ind)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                            )) : <></>
                        }

                        <Button onClick={addOption} variant={"ghost"}>
                            <Plus className="mr-2 w-4 h-4" />
                            Add Option
                        </Button>
                    </div>
                )
            }
            default: {
                return <></>
            }
        }
    }

    
    return (
        <Card >
            <CardHeader className="grid grid-cols-1 gap-3 items-baseline">
                <Label className="font-semibold flex items-center">
                    {renderQuestionTypeIcon()}
                    Question</Label>
                <div className="grid grid-cols-3 gap-4">
                    <Input className="col-span-2" placeholder="Type your question here" value={question.name} onChange={(e) => {
                        question.name = e.target.value
                        updateQuestion(question.qid, index, question)
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
                            <SelectItem value="checkbox">checkbox</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </CardHeader>
            <CardContent>
                {
                    renderQuestion()
                }
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center mr-1">
                    <Label className="mr-2 font-semibold">Required</Label>
                    <Switch checked={question.required} onCheckedChange={(checked) => {
                        question.required = checked
                        updateQuestion(question.qid, index, question)
                    }} />
                </div>
                <div className="flex items-center items-center">
                    <Button size={"icon"} variant={"ghost"} onClick={() => copyQuestion(index)}>
                        <CopyIcon className="w-5 h-5" />
                    </Button>
                    <Separator className="w-[1px] mr-2 h-[20px] bg-primary" orientation="vertical" />

                    <Button size={"icon"} variant={"ghost"} onClick={async () => await deleteQuestion(question.qid)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

            </CardFooter>
        </Card>
    )
}