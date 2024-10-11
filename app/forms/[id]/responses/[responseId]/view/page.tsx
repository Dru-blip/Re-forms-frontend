import { ResponseViewer } from "@/components/responses/response-viewer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse, Response } from "@/types";
import { format } from "date-fns";

const fetchResponse = async (formId: string, responseId: string) => {
    // const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses/${responseId}`, {
            headers: {
                "Content-type": "application/json",
            },
        });
        const responseData: ApiResponse<Response> = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
};

export default async function ViewResponse({ params }: { params: { id: string; responseId: string } }) {
    const response = await fetchResponse(params.id, params.responseId);
    
    return (
        <div className="container flex flex-col gap-3 py-8">
            <p>submitted {format(response?.submittedDate!,"Pp")}</p>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{response?.form.title}</CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <div>
                <ResponseViewer response={response!} />
            </div>
        </div>
    );
}
