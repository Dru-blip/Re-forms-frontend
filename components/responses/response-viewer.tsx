"use client";

import { Response } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";

interface Props {
    response: Response;
}

export function ResponseViewer({ response }: Props) {
    return (
        <div>
            <div className="flex flex-col gap-4">
                {response.answers ? (
                    response.answers.map((answer) => (
                        <Card key={answer.id}>
                            <CardHeader>
                                <CardTitle>{answer.question.text}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {answer.question.type === "TEXT" ? (
                                    <p>{answer.text}</p>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {answer.question.options.map((option) => {
                                            if (
                                                answer.options.find((op, index) => {
                                                    return op.id === option.id;
                                                })
                                            ) {
                                                return (
                                                    <div key={option.id} className="bg-accent p-2 rounded-md flex items-center justify-between border-2 border-gray-500">
                                                        {option.text}
                                                        <div
                                                            className={"border-[5px] w-5 h-5 border-black rounded-full"}
                                                        ></div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div
                                                    key={option.id}
                                                    className="bg-accent p-4 rounded-md flex items-center justify-between"
                                                >
                                                    {option.text}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
