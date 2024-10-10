import { cookies, headers } from "next/headers";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        // const body=(await req.body?.getReader().read())?.value
        const body = await req.json();
        // console.log(body)
        const response = await fetch(process.env.AUTH_API_URL + "/forgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...body }),
        });
        return Response.json(await response.json());
    } catch (error) {
        console.log(error);
    }

    // return Response.json({})
}
