import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getForm } from "@/lib/actions/form"
import { getSetting } from "@/lib/actions/settings"
import { getSubmissions } from "@/lib/actions/submissions"
import Link from "next/link"

export default async function FormResponse({ params }: { params: { id: string,responseId:string } }) {
    const form = await getForm(params.id)
    const setting = await getSetting(params.id)
    // console.log(form)
    // console.log(setting)
    return (
        <div className="flex justify-center min-h-screen bg-accent">
            <Card className="h-[200px] w-[500px] mt-10 container  py-8 justify-center flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl tracking-wide">
                        {form.data?.title}
                    </CardTitle>
                    <CardDescription>{setting.data?.confirmationMessage}</CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-1 gap-4">
                    {
                        setting.data?.editResponse ? <Link className="underline" href={`/forms/${form.data?.id}/responses/${params.responseId}/view`}>
                            View your response
                        </Link> : <></>
                    }
                    {
                        setting.data?.anotherResponse ?
                            <Link href={`/forms/${params.id}/live`} className="underline">
                                Submit another response
                            </Link> : <></>
                    }
                </CardFooter>
            </Card>
        </div>

    )
}