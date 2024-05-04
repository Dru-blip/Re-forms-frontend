import { IForm } from "@/types"
import FormCard from "./form-card"


interface Props{
    forms:IForm[]
}


export default function FormList({forms}:Props){
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                forms.map((form,index)=>(
                    <FormCard form={form} key={index}/>
                ))
            }
        </div>
    )
}