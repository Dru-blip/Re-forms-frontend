import FormSubmission from "@/components/submission/form-submission";
import { ApiResponse, Form, Question } from "@/types";
import { cookies } from "next/headers";

async function fetchForm(id: string): Promise<Form | null> {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/forms/${id}`, {
            headers: {
                "Content-type": "application/json",
            },
        });
        const responseData: ApiResponse<Form> = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
}

async function fetchFormQuestions(id: string) {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${id}/questions`, {
            headers: {
                "Content-type": "application/json",
            },
        });
        const responseData: ApiResponse<Question[]> = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
}

export default async function SubmitPage({ params }: { params: { id: string } }) {
    let formDetails = await fetchForm(params.id);
    let formQuestions = await fetchFormQuestions(params.id);


    return (
        <div className="container">
            <FormSubmission formDetails={formDetails!} formQuestions={formQuestions!} />
        </div>
    );
}
