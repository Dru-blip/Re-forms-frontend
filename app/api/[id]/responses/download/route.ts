import { cookies, headers } from "next/headers";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const token = cookies().get("token");
    if (token) {
        const response = await fetch(process.env.BASE_API + `/${params.id}/responses/download`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

    
        return new Response(response.body, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="package.json"`,
                "Content-Type": "application/json",
            },
        });
    }
}
