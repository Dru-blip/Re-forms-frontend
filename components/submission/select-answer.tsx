import { Answer, Question } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
    question: Question;
    answerMap: Map<string, Partial<Answer> | undefined>;
}

export default function SelectAnswer({ question, answerMap }: Props) {
    const [answer, setAnswer] = useState<string>("");

    const onSelect = (index: number) => {
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
                <Select
                    onValueChange={(value) => {
                        onSelect(Number.parseInt(value));
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                        {question.options ? (
                            question.options.map((option, index) => (
                                <SelectItem value={index + ""} key={option.id}>
                                    {option.text}
                                </SelectItem>
                            ))
                        ) : (
                            <></>
                        )}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}
