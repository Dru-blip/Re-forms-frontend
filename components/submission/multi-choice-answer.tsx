import { Answer, Question } from "@/types";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
    question: Question;
    answerMap: Map<string, Partial<Answer>|undefined>;
    answers: Partial<Answer>[];
    setAnswers: Dispatch<SetStateAction<Partial<Answer>[]>>;
}

export default function MultiChoiceAnswer({ question, answerMap, answers, setAnswers }: Props) {
    const [answer, setAnswer] = useState<string>("");
    const [index, setIndex] = useState<number>();
    const onSelect = (index: number) => {
        setIndex(index);
        answerMap.set(question.id, {
            optionIds: [question.options[index].id],
            questionId: question.id,
            formId: question.formId,
        });
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
                                index === optionIndex
                                    ? "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between border-2 border-gray-500"
                                    : "cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between"
                            }
                        >
                            <Label>{option.text}</Label>
                            <div
                                className={
                                    index === optionIndex
                                        ? `border-[5px] w-5 h-5 border-black rounded-full`
                                        : "border w-5 h-5 rounded-full border-gray-900"
                                }
                            ></div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </CardContent>
        </Card>
    );
}
