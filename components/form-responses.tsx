"use client"

import { IAnswer, IQuestion, ISubmission } from "@/types";
import { Button } from "./ui/button";
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
import { useEffect } from "react";


interface Props {
    responses: {date:Date,values:IAnswer[]}[],
    submissions:ISubmission[]
    header:IQuestion[]
    // columns: string[]
}

export default function FormResponses({ responses,submissions,header }: Props) {
    
  
    return (
        <div className="container py-8">
            <Link href={'/dashboard'}>
                <Button>Dashboard</Button>
            </Link>
            
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead >Date</TableHead>
                        {
                            header.map((column,index)=>{
                                return <TableHead  key={index}>{column.name}</TableHead>
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        responses.map((response,index)=>{
                            return (
                                <TableRow key={index}>
                                    <TableCell >{format(response.date,"Pp")}</TableCell>
                                    {
                                        response.values.map((value,index)=>(
                                            <TableCell  key={index}>{value.value?.join("")}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            )
                        })
                        // submissions.map((submission,index)=>{
                        //     return (
                        //         <TableRow key={index}>
                        //             {format()}
                        //         </TableRow>
                        //     )
                        // })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

