import ResponseSettings from "@/components/settings/response-settings";
import { Card } from "@/components/ui/card";
import { getSetting } from "@/lib/actions/settings";


export default async function Responses({params}:{params:{id:string}}){
    const settings = await getSetting(params.id)
    
    return (
        <ResponseSettings setting={settings.data!}/>
    )
}