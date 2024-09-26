import FormContext from "@/context/form-context";
import * as optionActions from "@/lib/actions/option";
import { Question } from "@/types";
import { Loader2Icon, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { OptionsList } from "./options-list";

interface Props {
    question: Question;
}

/**
 * Renders a question based on the question type. This component will render a
 * form based on the question type, and allow the user to edit the question text,
 * options, and other settings.
 *
 * @param {Question} question - The question object to render.
 * @returns {JSX.Element} The rendered question component.
 */
export const QuestionRenderer = ({ question }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { formQuestions, updateFormQuestions } = useContext(FormContext);

    const addOption = async () => {
        setIsLoading(true);
        const newOption = await optionActions.createOption(question.id, "Option");
        if (!question.options) {
            question.options = [newOption?.data!];
        } else {
            question.options.push(newOption?.data!);
        }
        updateFormQuestions([...formQuestions]);
        setIsLoading(false);
    };

    switch (question.type) {
        case "TEXT":
            return <div className="bg-accent rounded-md p-3">{question.type} answer here</div>;
        case "MULIT_CHOICE":
        case "CHECKBOX":
            return (
                <div className="grid grid-cols-1 gap-4 p-2">
                    <OptionsList question={question} />
                    <Button variant="ghost" onClick={addOption} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                        ) : (
                            <Plus className="mr-2 w-4 h-4" />
                        )}
                        Add Option
                    </Button>
                </div>
            );
        default:
            return <></>;
    }
};
