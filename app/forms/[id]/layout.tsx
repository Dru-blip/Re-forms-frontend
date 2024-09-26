import { FormProvider } from "@/context/form-context";
import { Form, ApiResponse, Question } from "@/types";
import { cookies, headers } from "next/headers";

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

async function fetchFormQuestions(id: string) {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${id}/questions`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: ApiResponse<Question[]> = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
}

export default async function FormLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    const pathname = headers().get("x-pathname");
    let formDetails = {} as Form;
    let formQuestions: Question[] = [];
    
    if (pathname && !pathname.includes("/live")) {
        formDetails = (await fetchForm(params.id)) ?? ({} as Form);
        formQuestions = (await fetchFormQuestions(params.id)) ?? [];
    }
    return (
        <section>
            <FormProvider details={formDetails!} questions={formQuestions!}>
                {children}
            </FormProvider>
        </section>
    );
}
