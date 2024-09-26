"use server";

import { ApiResponse, Question } from "@/types";
import { cookies } from "next/headers";

export const updateQuestion = async (question: Partial<Question>) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${question.formId}/questions/${question.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify({
                text: question.text,
                order: question.order,
                isRequired: question.isRequired,
                type: question.type,
            }),
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

export const createQuestion = async (
    formId: string,
    isRequired: boolean,
    order: number
): Promise<ApiResponse<Question> | null> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/questions`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify({ isRequired, order }),
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

export const reorderQuestion = async (q1: Question, q2: Question) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${q1.formId}/questions/reorder`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify({ q1, q2 }),
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

export const deleteQuestion = async (formId: string, questionId: string): Promise<ApiResponse<Question> | null> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/questions/${questionId}`, {
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
