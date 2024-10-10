"use client";

import FormContext from "@/context/form-context";
import * as questionActions from "@/lib/actions/questions";
import { debounce } from "@/lib/utils";
import { Question, QuestionType } from "@/types";
import { ChangeEvent, useContext, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { QuestionActions } from "./question-actions";
import { QuestionRenderer } from "./question-renderer";
import DisplayQuestionTypeIcon from "./question-type-icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { GripVertical } from "lucide-react";

interface Props {
    question: Question;
    index: number;
}

/**
 * A single question card component. This component will render a question form
 * based on the question type, and allow the user to edit the question text,
 * options, and other settings.
 *
 * @param {Question} question - The question object to render.
 * @param {number} index - The index of the question in the form.
 * @returns {JSX.Element} The rendered question card component.
 */
export default function QuestionCard({ question, index }: Props): JSX.Element {
    const { formQuestions, updateFormQuestions, activeQuestion, updateActiveQuestion } = useContext(FormContext);
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable({
        id: question.id,
        data: { index, question },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleUpdateQuestion = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        question.text = e.target.value;
        formQuestions[index] = { ...question };
        updateFormQuestions([...formQuestions]);
        await questionActions.updateQuestion({ id: question.id, text: question.text });
    }, 1000);

    const handleQuestionTypeChange = async (value: string) => {
        if (question.type !== value) {
            question.type = value as QuestionType;
            if (question.type !== "MULIT_CHOICE" && question.type !== "CHECKBOX" && question.type!=="SELECT") {
                question.options.length = 0;
            }
            formQuestions[index] = { ...question };
            updateFormQuestions([...formQuestions]);
            await questionActions.updateQuestion({ id: question.id, type: question.type });
        }
    };

    return (
        <Card
            style={style}
            className={
                activeQuestion?.id === question.id
                    ? "flex flex-row-reverse border-l-4 border-black"
                    : "flex flex-row-reverse"
            }
            ref={setNodeRef}
            onClick={() => {
                updateActiveQuestion(question);
            }}
        >
            <Button variant={"ghost"} className="h-full cursor-grab" {...attributes} {...listeners}>
                <GripVertical />
            </Button>
            <div className="w-full">
                <CardHeader className="grid grid-cols-1 gap-3 items-baseline">
                    <Label className="font-semibold flex items-center">
                        <DisplayQuestionTypeIcon type={question.type} />
                        Question
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            className="col-span-2"
                            placeholder="Type your question here"
                            defaultValue={question.text}
                            onChange={handleUpdateQuestion}
                        />

                        <Select onValueChange={handleQuestionTypeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={question.type.toLowerCase()} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TEXT">text</SelectItem>
                                <SelectSeparator />
                                <SelectItem value="MULIT_CHOICE">multi</SelectItem>
                                <SelectItem value="CHECKBOX">checkbox</SelectItem>
                                <SelectItem value="SELECT">select</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <QuestionRenderer question={question} />
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center mr-1">
                        <Label className="mr-2 font-semibold">Required</Label>
                        <Switch
                            checked={question.isRequired}
                            onCheckedChange={async (checked: boolean) => {
                                question.isRequired = checked;
                                formQuestions[index] = { ...question };
                                updateFormQuestions([...formQuestions]);
                                await questionActions.updateQuestion({
                                    id: question.id,
                                    isRequired: question.isRequired,
                                });
                            }}
                        />
                    </div>
                    <QuestionActions question={question} />
                </CardFooter>
            </div>
        </Card>
    );
}
