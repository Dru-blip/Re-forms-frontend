import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse, Form } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";

async function fetchForm(id: string): Promise<Form | null> {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/forms/${id}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: ApiResponse<Form> = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
}

export default async function FormResponse({ params }: { params: { id: string; responseId: string } }) {
    const form = await fetchForm(params.id);
    return (
        <div className="flex justify-center min-h-screen bg-accent">
            <Card className="h-[200px] w-[500px] mt-10 container  py-8 justify-center flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl tracking-wide">{form?.title}</CardTitle>
                    <CardDescription>{form?.settings.confirmationMessage}</CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-1 gap-4">
                    {form?.settings.editResponse ? (
                        <Link className="underline" href={`/forms/${form?.id}/responses/${params.responseId}/view`}>
                            View your response
                        </Link>
                    ) : (
                        <></>
                    )}
                    {form?.settings.anotherResponse ? (
                        <Link href={`/forms/${params.id}/live`} className="underline">
                            Submit another response
                        </Link>
                    ) : (
                        <></>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
