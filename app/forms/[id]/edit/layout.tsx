import EditPageHeader from "@/components/editor/header";
import { ApiResponse, Form } from "@/types";
import { cookies } from "next/headers";

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

export default async function FormLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        id: string;
    };
}) {
    const form = await fetchForm(params.id);
    return (
        <section className="grid grid-cols-1 gap-10">
            <div>
                <EditPageHeader id={params.id} title={form?.title!} />
            </div>
            <div>{children}</div>
        </section>
    );
}
