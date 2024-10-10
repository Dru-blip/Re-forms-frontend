"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const downloadResponses = async (formId: string) => {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses/download`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const blob = await response.blob();
        return {
            msg: "success",
            data: blob,
        };
    } catch (err) {
        console.log(err);
        return {
            msg: "error",
        };
    }
};

export const deleteResponses = async (formId: string) => {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        revalidatePath(`/forms/${formId}`);
        return {
            msg: "success",
            data: responseData.data,
        };
    } catch (err) {
        console.log(err);
        return {
            msg: "error",
        };
    }
};
