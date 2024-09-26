import Header from "@/components/responses/header";
import ResponseTable from "@/components/responses/response-table";
import { cookies } from "next/headers";

const fetchResponses = async (formId: string) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses`, {
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

export default async function ResponseTablePage({ params }: { params: { id: string } }) {
    const { questions, responses } = await fetchResponses(params.id);
    return (
        <div>
            <Header formId={params.id} />
            <div className="container">
                <ResponseTable responses={responses} header={questions} />
            </div>
        </div>
    );
}
