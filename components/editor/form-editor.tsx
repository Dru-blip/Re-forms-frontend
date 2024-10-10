"use client";

import FormContext from "@/context/form-context";
import * as questionActions from "@/lib/actions/questions";
import { Loader2Icon, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { QuestionsList } from "./question-list";

export default function FormEditor() {
    const { formDetails, formSettings, updateFormQuestions, formQuestions } = useContext(FormContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addQuestion = async () => {
        setIsLoading(true);

        let maxOrder = -Infinity;
        formQuestions.forEach((question) => {
            maxOrder = Math.max(question.order, maxOrder);
        });
      
        let newQuestion = await questionActions.createQuestion(
            formDetails.id,
            formSettings.questionsRequiredDefault,
            maxOrder + 1
        );
        if (newQuestion?.message === "success") {
            updateFormQuestions([...formQuestions, newQuestion?.data!]);
        }

        setIsLoading(false);
    };

    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            <div>{formQuestions ? <QuestionsList /> : <></>}</div>
            <Card className=" flex items-center justify-center px-6 py-6">
                <div className="py-8 border-dotted border-4 rounded-xl w-full flex items-center justify-center">
                    <Button variant={"ghost"} disabled={isLoading} onClick={addQuestion}>
                        {isLoading ? (
                            <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                        ) : (
                            <Plus className="mr-2 w-4 h-4" />
                        )}
                        New Question
                    </Button>
                </div>
            </Card>
        </div>
    );
}
