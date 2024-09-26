import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Answer, Question, Response } from "@/types";

interface Props {
    responses: Response[];
    header: Question[];
}

export default async function ResponseTable({ header, responses }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    {header ? (
                        header.map((column, index) => {
                            return <TableHead key={index}>{column.text}</TableHead>;
                        })
                    ) : (
                        <></>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    responses.map((response,index)=>{
                        return (
                            <TableRow key={index}>
                                <TableCell >{format(response.submittedDate,"Pp")}</TableCell>
                                {
                                    response.answers.map((answer)=>{
                                        if(answer.options.length>0){
                                            let optionStrings:string[]=[]
                                            answer.options.forEach((val)=>{
                                                optionStrings.push(val.text)
                                            })
                                            return <TableCell key={answer.id}>{optionStrings.join(", ")}</TableCell>
                                        }
                                       return <TableCell key={answer.id}>{answer.text}</TableCell>
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    );
}
