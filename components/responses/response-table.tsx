import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { IAnswer, IQuestion, ISubmission } from "@/types"

interface Props {
    responses: {date:Date,values:IAnswer[]}[],
    header:IQuestion[]
    // columns: string[]
}


export default function ResponseTable({header,responses}:Props){
    return (
        <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead >Date</TableHead>
                        {
                           header? header.map((column,index)=>{
                                return <TableHead  key={index}>{column.name}</TableHead>
                            }):<></>
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
                                            <TableCell  key={index}>{value.value?.join(" , ")}</TableCell>
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
    )
}