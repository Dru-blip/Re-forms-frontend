import { Answer } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
    answer: Answer;
}

export default function ViewSelectAnswer({ answer }: Props) {
    const selectedOptions = answer.optionIds.map((id) => {
        return answer.options.filter((option) => {
            if (option.id === id) return option;
        })[0];
    });
    const selectedOption = selectedOptions[0];
    return (
        <Card>
            <CardHeader>
                <CardTitle>{answer.question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Select disabled>
                        <SelectTrigger>
                            <SelectValue placeholder={selectedOption.text} />
                        </SelectTrigger>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
