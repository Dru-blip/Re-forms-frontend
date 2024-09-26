import { Question } from "@/types";
import { Button } from "../ui/button";
import { CopyIcon, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import * as questionActions from "@/lib/actions/questions";
import { useContext, useState } from "react";
import FormContext from "@/context/form-context";
import { Icon } from '@iconify-icon/react';

interface Props {
  question: Question;
}

/**
 * Renders a component that displays a copy and delete button for a
 * question.
 *
 * @param {{ question: Question }} props - The question object to render.
 * @returns {JSX.Element} The rendered component.
 */
export function QuestionActions({ question }: Props) {
  const { formQuestions, updateFormQuestions } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Deletes a question from a form. This function is called when the
   * user clicks the delete button in the question actions component.
   *
   * @async
   */
  const handleDeleteQuestion = async () => {
    setIsLoading(true);
    const filteredQuestions = formQuestions.filter(
      (ques) => ques.id !== question.id
    );
    await questionActions.deleteQuestion(question.formId, question.id!);
    updateFormQuestions(filteredQuestions);
    setIsLoading(false);
  };
  
  return (
    <div className="flex items-center">
      <Button size={"icon"} variant={"ghost"}>
        {/* <CopyIcon className="w-5 h-5" /> */}
        <Icon icon="gravity-ui:copy" width={"20"} height={"20"}/>
      </Button>
      <Separator
        className="w-[1px] mr-2 h-[20px] bg-primary"
        orientation="vertical"
      />

      <Button size={"icon"} variant={"ghost"} onClick={handleDeleteQuestion}>
      {/* <Icon icon="eva:trash-fill" /> */}
      <Icon icon="eva:trash-outline" width={"20"} height={"20"}/>
        {/* <Trash2 className="w-4 h-4" /> */}
      </Button>
    </div>
  );
}
