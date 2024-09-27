import { Response } from "@/types";
import AnswerRenderer from "./answer-renderer";

interface Props {
    response: Response;
}

export function ResponseViewer({ response }: Props) {
    return (
        <div>
            <div className="flex flex-col gap-4">
                {response.answers ? (
                    response.answers.map((answer) => <AnswerRenderer answer={answer} key={answer.id} />)
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
