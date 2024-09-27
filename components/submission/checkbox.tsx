"use client";

import { Answer, Question } from "@/types";
import { Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

interface Props {
    question: Question;
    answerMap: Map<string, Partial<Answer> | undefined>;
}

export default function CheckboxAnswers({ question, answerMap }: Props) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const onSelect = (index: number) => {
        let itemIndex = selectedItems.findIndex((i) => i === index);
        if (itemIndex !== -1) {
            selectedItems.splice(itemIndex, 1);
            setSelectedItems([...selectedItems]);
        } else {
            selectedItems.push(index);
            setSelectedItems([...selectedItems]);
        }

        const optionIds = selectedItems.map((item) => {
            return question.options[item].id;
        });

        answerMap.set(question.id, {
            optionIds,
            questionId: question.id,
            formId: question.formId,
        });
    };

    const isSelected = (index: number) => {
        return selectedItems.findIndex((i) => i === index) !== -1 ? true : false;
    };

    return (
        <Card className="py-6 px-4">
            <CardHeader>
                <CardTitle>
                    <span className="font-semibold text-md leading-3">
                        {question.text}
                        {question.isRequired ? <span className="text-red-600">*</span> : <></>}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {question.options ? (
                    question.options.map((option, optionIndex) => (
                        <div
                            onClick={() => onSelect(optionIndex)}
                            key={optionIndex}
                            className={
                                isSelected(optionIndex)
                                    ? "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between border-2 border-gray-500"
                                    : "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between"
                            }
                        >
                            <Label>{option.text}</Label>
                            {isSelected(optionIndex) ? <SquareCheck /> : <Square />}
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </CardContent>
        </Card>
    );
}
