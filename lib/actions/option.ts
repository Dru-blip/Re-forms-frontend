"use server";

import { ApiResponse, Option } from "@/types";
import { cookies } from "next/headers";

export const createOption = async (questionId: string, text: string): Promise<ApiResponse<Option> | null> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${questionId}/options`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify({ text }),
        });

        const responseData = await response.json();

        if (responseData.message === "success") {
            return responseData;
        }
        return null;
    } catch (err) {
        return null;
    }
};

export const updateOption = async (questionId: string,optionId:string,text: string): Promise<ApiResponse<Option> | null> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${questionId}/options/${optionId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify({ text }),
        });

        const responseData = await response.json();

        if (responseData.message === "success") {
            return responseData;
        }
        console.log(responseData)
        return null;
    } catch (err) {
        return null;
    }
};

export const deleteOption = async (questionId: string, optionId: string) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${questionId}/options/${optionId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });

        const responseData = await response.json();

        if (responseData.message === "success") {
            return responseData;
        }
        return null;
    } catch (err) {
        return null;
    }
};
