import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";


export default function General() {
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