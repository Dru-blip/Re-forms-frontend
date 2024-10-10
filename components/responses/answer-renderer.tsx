import { Answer } from "@/types";
import ViewMultiChoiceAnswer from "./view-multi-choice-answer";
import ViewTextAnswer from "./view-text-answer";
import ViewCheckboxAnswer from "./view-checkbox-answer";
import ViewSelectAnswer from "./view-select-answer";

interface Props {
    answer: Answer;
}

export default function AnswerRenderer({ answer }: Props) {
    switch (answer.question.type) {
        case "TEXT": {
            return <ViewTextAnswer answer={answer} />;
        }
        case "MULIT_CHOICE": {
            return <ViewMultiChoiceAnswer answer={answer} />;
        }
        case "CHECKBOX": {
            return <ViewCheckboxAnswer answer={answer} />;
        }
        case "SELECT": {
            return <ViewSelectAnswer answer={answer} />;
        }
    }
}
