
import { IAnswer, IQuestion, ISubmission } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import ResponseTable from "./response-table";


interface Props {
    responses: {date:Date,values:IAnswer[]}[],
    submissions:ISubmission[]
    header:IQuestion[]
    // columns: string[]
}

export default function FormResponses({ responses,submissions,header }: Props) {
    
    return (
        <div className="container py-8">
            
        </div>
    )
}

