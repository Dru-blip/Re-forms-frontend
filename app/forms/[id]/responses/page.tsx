import FormResponses from "@/components/form-responses"
import { getSubmissions } from "@/lib/actions/form"
import { IAnswer } from "@/types"

export default async function Responses({params}:{params:{id:string}}) {
    const data=await getSubmissions(params.id)
    const parseFormSumbissions=()=>{
        return data.data?.map((val)=>(
            {...val,response:JSON.parse(val.response)}
        ))
    }
    const getHeader=():string[]=>{
        if(data.data!.length>0){
            let singleResponse:IAnswer[]=JSON.parse(data.data![0].response)
            let columns:string[]=[]
            singleResponse.map((ans)=>{
                columns.push(ans.name)
            })
            return columns
        }
        return []
    }
    const parsedSubmissions=parseFormSumbissions()
    const columns=getHeader()
    return (
        <div>
            <FormResponses submissions={parsedSubmissions as any[]} columns={columns}/>
        </div>
    )
}