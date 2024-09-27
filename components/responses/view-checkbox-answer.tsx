import { Answer } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SquareCheckIcon, SquareIcon } from "lucide-react";

interface Props {
    answer: Answer;
}

export default function ViewCheckboxAnswer({ answer }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{answer.question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {answer.question.options.map((option) => {
                        if (
                            answer.options.find((op) => {
                                return op.id === option.id;
                            })
                        ) {
                            return (
                                <div
                                    key={option.id}
                                    className="bg-accent p-2 rounded-md flex items-center justify-between border-2 border-gray-500"
                                >
                                    {option.text}
                                    <div>
                                        <SquareCheckIcon />
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div key={option.id} className="bg-accent p-4 rounded-md flex items-center justify-between">
                                {option.text}
                                <div>
                                    <SquareIcon />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
