import { Question, Option } from "@/types";
import { Circle, Square, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormContext from "@/context/form-context";
import { ChangeEvent, useContext } from "react";
import * as optionActions from "@/lib/actions/option";
import { debounce } from "@/lib/utils";

interface Props {
    question: Question;
}

export function OptionsList({ question }: Props) {
    const { formQuestions, updateFormQuestions, activeQuestion} = useContext(FormContext);

    const handleDeleteOption = async (index: number) => {
        const option = question.options.splice(index, 1);
        updateFormQuestions([...formQuestions]);
        await optionActions.deleteOption(question.id, option[0].id);
    };

    const handleOptionTextChange = debounce(async (e: ChangeEvent<HTMLInputElement>, ...rest: any) => {
        const [index, option] = rest;
        option.text = e.target.value;
        question.options![index] = option;
        updateFormQuestions([...formQuestions]);
        const res = await optionActions.updateOption(question.id, option.id, option.text);
        console.log(res);
    }, 1000);

    return question.options ? (
        question.options.map((option: Option, ind) => (
            <div key={option.id} className="flex items-center justify-between">
                <div className="flex items-center w-full">
                    {question.type === "MULIT_CHOICE" ? (
                        <Circle className="mr-2 w-6 h-6 text-gray-500" />
                    ) : (
                        <Square className="mr-2 w-6 h-6 text-gray-500" />
                    )}

                    <Input
                        defaultValue={option.text}
                        onChange={async (e) => {
                            await handleOptionTextChange(e, ind, option);
                        }}
                    />
                </div>
                {activeQuestion && activeQuestion.id === question.id ? (
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteOption(ind)}>
                        <X className="w-4 h-4" />
                    </Button>
                ) : (
                    <></>
                )}
            </div>
        ))
    ) : (
        <></>
    );
}
