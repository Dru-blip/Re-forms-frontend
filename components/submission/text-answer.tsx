import { Answer, Question } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface Props {
    question: Question;
    answers: Partial<Answer>[];
    answerMap: Map<string, Partial<Answer>|undefined>;
    setAnswers: Dispatch<SetStateAction<Partial<Answer>[]>>;
}

export default function TextAnswer({ question, answerMap, setAnswers, answers }: Props) {
    const [text, setText] = useState<string>();
    return (
        <Card className="flex flex-col p-4 gap-3 justify-start">
            <CardHeader>
                <CardTitle>
                    <span className="font-semibold text-md leading-3">
                        {question.text}
                        {question.isRequired ? <span className="text-red-600">*</span> : <></>}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    required={question.isRequired}
                    placeholder="Your Answer"
                    onChange={(e) => {
                        setText(e.target.value);
                        answerMap.set(question.id, {
                            text: e.target.value,
                            questionId: question.id,
                            formId: question.formId,
                        });
                    }}
                />
            </CardContent>
        </Card>
    );
}
