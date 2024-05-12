import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";


export default function SettingsGeneral() {
    return (
        <div className="grid grid-cols-1 gap-3">
            <Card>
                <CardHeader>
                    <CardTitle>Form Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="form title" />
                </CardContent>
                <Separator />
                <CardFooter className="ml-3 p-2">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Form Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="form description" />
                </CardContent>
                <Separator />
                <CardFooter className="ml-3 p-2">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>

    )
}