import { IAnswer, IQuestion } from "@/types";
// import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


interface Props {
    question: IQuestion,
    answers: IAnswer[],
    setAnswers: Dispatch<SetStateAction<IAnswer[]>>
}


export default function MultiAnswer({ question, answers, setAnswers }: Props) {
    const [answer, setAnswer] = useState<string>(" ")
    const [index, setIndex] = useState<number>()
    const onSelect = (index: number) => {
        setIndex(index)
        console.log(question.options?.at(index))
    }
    return (
        <Card className="py-6 px-4">
            <CardHeader>
                <CardTitle>
                    {question.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {
                    question.options ? question.options.map((option, optionIndex) => (
                        <div onClick={() => onSelect(optionIndex)} key={optionIndex} className={index===optionIndex?"cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between border-2 border-gray-500":"cursor-pointer bg-accent p-4 rounded-md flex items-center justify-between"}>
                            <Label>{option}</Label>
                            <div className={index === optionIndex ? `border-[5px] w-5 h-5 border-black rounded-full` : "border w-5 h-5 rounded-full border-black"}></div>
                        </div>
                    )) : <></>
                }
            </CardContent>
        </Card>

    )
}


//  {/* <RadioGroup className={"flex flex-col gap-3 rounded"} value={answer} onChange={setAnswer} aria-label="Server size">
//                 {question.options ? question.options.map((option, index) => (
//                     <Field key={index} className="flex items-center justify-between gap-5 p-4 rounded-md bg-accent">
//                         <Label>{option}</Label>
//                         <Radio
//                             value={option}
//                             className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-black"
//                         >
//                             <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
//                         </Radio>

//                     </Field>
//                 )) : <></>}
//             </RadioGroup> */}

// <RadioGroup required={question.required} value={answer} onValueChange={(val) => {
//     const newAnswers = answers.filter((ans) => ans.questionId !== question.id)
//     setAnswer(val)
//     setAnswers([...newAnswers, {
//         questionId: question.id as string, name: question.name, value: [val], type: question.type,
//         submissionId: ""
//     }])
// }}>
//     <Label className="font-semibold text-md leading-3">{question.name}{question.required ? <span className="text-red-600">*</span> : <></>}</Label>
//     <div className="flex flex-col gap-3">
//         {question.options?.map((value, ind) => (
//             <div key={ind} className="flex items-center">
//                 <RadioGroupItem className="mr-2" value={value} />
//                 <Label>{value}</Label>
//             </div>
//         ))}
//     </div>

// </RadioGroup>