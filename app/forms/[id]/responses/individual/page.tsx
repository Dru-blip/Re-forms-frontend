import Header from "@/components/responses/header";
import IndividualResponsePageHeader from "@/components/responses/individual-response-page-header";

import { ResponseViewer } from "@/components/responses/response-viewer";
import { Response } from "@/types";
import { cookies } from "next/headers";

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const fetchResponse = async (formId: string, query: string) => {
    const skip = query ? Number.parseInt(query) - 1 : 0;
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses/individual?skip=${skip}&take=${1}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
};

export default async function IndividualResponsePage({ params, searchParams }: Props) {
    const queryParam = searchParams.response as string;
    const { count, response }: { count: number; response: Response } = await fetchResponse(params.id, queryParam);

    // Sort the answers of response by question order
    const sortedResponse = {
        ...response,
        answers: response.answers.sort((a, b) => a.question.order - b.question.order),
    };
    return (
        <div >
            <Header formId={params.id} />
            <div className="container flex flex-col gap-4">
                <IndividualResponsePageHeader
                    formId={params.id}
                    responseNo={Number.parseInt(queryParam)}
                    totalResponses={count}
                />
                <ResponseViewer response={sortedResponse} />
            </div>
        </div>
    );
}
