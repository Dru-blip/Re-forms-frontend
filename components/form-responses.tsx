"use client"

import { IAnswer, ISubmission } from "@/types";
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
    submissions: any[],
    columns: string[]
}

export default function FormResponses({ submissions, columns }: Props) {
    // console.log(submissions)
    useEffect(()=>{
        console.log(submissions)
    })
    return (
        <div className="container py-8">
            <Link href={'/dashboard'}>
                <Button>Dashboard</Button>
            </Link>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                        {
                            columns ? columns.map((column,index) => (
                                <TableHead key={index}>{column}</TableHead>
                            )) : <></>
                        }
                       
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        submissions.length > 0 ? submissions.map((submission,index) => (
                            <TableRow key={index}>
                                <TableCell>{format(submission.date,"Pp")}</TableCell>
                                {
                                    
                                    submission.response.map((res:IAnswer)=>(
                                        <TableCell key={res.qid}>
                                            {
                                                res.answers!?res.answers.map((ans,index)=>(<p key={index}>{ans}</p>)):<></>
                                            }
                                            
                                        </TableCell>
                                    ))
                                }
                               
                            </TableRow>
                        ))
                            : <></>
                    }
                </TableBody>
            </Table>
        </div>
    )
}