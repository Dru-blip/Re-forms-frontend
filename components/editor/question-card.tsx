"use client"

import { IForm, IQuestion, QuestionType } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { useContext, useState } from "react";
import FormContext from "@/context/form-context";
import { Button } from "../ui/button";
import { Circle, CircleDotIcon, CopyIcon, Notebook, NotepadText, Plus, Trash2, X } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";



interface Props {
    question: IQuestion,
    index: number,
    updateQuestion: (id: string, index: number, question: IQuestion) => void,
}

export default function QuestionCard({ question, index, updateQuestion }: Props) {
    const { setQuestions, formQuestions, setDeletedQuestions, deletedQuestions } = useContext(FormContext)


    const deleteQuestion = (id: string) => {

        let filtered = formQuestions.filter((question) => {
            if (question.qid !== id) {
                return question
            }
        })

        setQuestions([...filtered])

        setDeletedQuestions([...deletedQuestions, question])
    }

    const renderQuestionTypeIcon=()=>{
        switch(question.type){
            case "short":{
                return <NotepadText className="w-4 h-4 mr-2"/>
            }
            case "long":{
                return <Notebook className="w-4 h-4 mr-2"/>
            }
            case "multi":{
                return <CircleDotIcon className="w-4 h-4 mr-2"/>
            }
            default:{
                return <></>
            }
        }
    }

    const renderQuestion = () => {
        switch (question.type) {
            case "short": {
                return (
                    <div className="bg-accent rounded-md p-3">Short answer Here</div>
                )
            }
            case "long": {
                return (
                    <div className="bg-accent rounded-md p-3">Long answer Here</div>
                )
            }
            default: {
                return (
                    <div className="grid grid-cols-1 gap-4  p-2">
                        {
                            question.options ? question.options.map((option, ind) => (
                                <div key={ind} className="flex items-center justify-between">
                                    <div className="flex items-center w-full">
                                        <Circle className=" mr-2 w-6 h-6 text-gray-500"/>
                                        <Input value={option} onChange={(e) => {
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
        }
    }

    const deleteOption = (ind: number) => {
        question.options?.splice(ind, 1)
        updateQuestion(question.qid, index, question)
    }

    const addOption = () => {
        if (question.options) {
            question.options.push(`Option ${question.options.length + 1}`)
        } else {
            question.options = [`Option 1`]
        }
        updateQuestion(question.qid, index, question)
    }

    const onQuestionTypeChange = (value: string) => {
        question.type = value as QuestionType
        question.options = []

        updateQuestion(question.qid, index, question)
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
                    }}  />
                </div>
                <div className="flex items-center items-center">
                    <Button size={"icon"} variant={"ghost"}>
                        <CopyIcon className="w-5 h-5" />
                    </Button>
                    <Separator className="w-[1px] mr-2 h-[20px] bg-primary" orientation="vertical" />

                    <Button size={"icon"} variant={"ghost"} onClick={() => deleteQuestion(question.qid)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

            </CardFooter>
        </Card>
    )
}