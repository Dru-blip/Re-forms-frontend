import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";



export default function Defaults(){
    return (
        <Card>
            <Switch />
            <Label>Make Questions Required by default</Label>
        </Card>
    )
}