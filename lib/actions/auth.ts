"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { userRegisterSchema } from "../form-validation";

export const registerFormAction = async (values: z.infer<typeof userRegisterSchema>) => {

    try {
        const res = await fetch(process.env.AUTH_API_URL + "/register", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ ...values }),
        });

        const responseData = await res.json();
        if (responseData) {
            if (responseData.data.accessToken) {
                cookies().set("token", responseData.data.accessToken, {
                    maxAge: 18000,
                    httpOnly: true,
                });
            }
            return {
                msg: responseData.message,
                data:responseData
            };
        }

        return {
            data:responseData,
            msg: responseData.message,
        };
    } catch (e) {
        return {
            msg: "error",
        };
    }
};

export const loginFormAction = async (email: string, password: string) => {
    const user = { email, password };

    try {
        const response = await fetch(process.env.AUTH_API_URL + "/login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ ...user }),
        });

        const responseData = await response.json();
        if (responseData.message === "success") {
            cookies().set("token", responseData.data.accessToken, {
                maxAge: 18000,
                httpOnly: true,
            });
            return {
                data:responseData,
                msg: responseData.message,
            };
        }
        return {
            data:responseData,
            msg: responseData.message,
        };
    } catch (e) {
        console.log(e);
        return {
            msg: "error",
        };
    }
};

export const logout = async () => {
    cookies().delete("token");
};

export const updatePassword = async (otpId: string, email: string, newPassword: string) => {
    try {
        const response = await fetch(process.env.AUTH_API_URL + "/updatePassword", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ otpId, email, newPassword }),
        });

        const responseData = await response.json();
        return responseData;
    } catch (e) {
        console.log(e);
        return {
            msg: "error",
        };
    }
};
