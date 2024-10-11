"use client";

import { Answer, Form, Question } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import * as ResponseActions from "@/lib/actions/submissions";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import MultiChoiceAnswer from "./multi-choice-answer";
import TextAnswer from "./text-answer";
import CheckboxAnswers from "./checkbox";
import SelectAnswer from "./select-answer";

interface Props {
    formDetails: Form;
    formQuestions: Question[];
}

export default function FormSubmission({ formDetails, formQuestions }: Props) {
    const [answers, setAnswers] = useState<Partial<Answer>[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const answerMap: Map<string, Partial<Answer> | undefined> = new Map();

    useEffect(() => {
        for (const question of formQuestions) {
            answerMap.set(question.id, {});
        }
    }, []);

    const onSumbit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (answerMap.size === formQuestions.length) {
            const an = { formId: formDetails.id, answers: Array.from(answerMap.values()) };
            const res = await ResponseActions.submitResponse(formDetails.id, an);
            if (res.msg === "success") {
                router.push(`/forms/${formDetails.id}/responses/${res.data?.id}/formResponse`);
            }
        }
        setIsLoading(false);
    };

    const RenderQuestion = ({ question }: { question: Question }) => {
        switch (question.type) {
            case "TEXT": {
                return (
                    <TextAnswer answerMap={answerMap} question={question} answers={answers} setAnswers={setAnswers} />
                );
            }
            case "MULIT_CHOICE": {
                return (
                    <MultiChoiceAnswer
                        answerMap={answerMap}
                        question={question}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );
            }
            case "CHECKBOX": {
                return <CheckboxAnswers answerMap={answerMap} question={question} />;
            }
            case "SELECT": {
                return <SelectAnswer answerMap={answerMap} question={question} />;
            }
            default: {
                return <></>;
            }
        }
    };

    return (
        <div className="container py-8 grid grid-cols-1 gap-3 items-center justify-center">
            <Card className="grid w-full grid-cols-1 gap-3 justify-start pb-4 p-3">
                <CardHeader>
                    <CardTitle>
                        <p className="text-3xl font-semibold  text-primary">{formDetails.title}</p>
                    </CardTitle>
                    <CardDescription>
                        <span className="text-red-500 font-thin ">* indicates required question</span>
                    </CardDescription>
                </CardHeader>
            </Card>

            <div>
                <form className="grid grid-cols-3 gap-3" onSubmit={(e) => onSumbit(e)}>
                    <div className="grid grid-cols-1 col-span-3 gap-4 ">
                        {formQuestions ? (
                            formQuestions.map((question) => (
                                <Card key={question.id}>{<RenderQuestion question={question} />}</Card>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
