"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { userRegisterSchema } from "../form-validation";
import { ApiResponse } from "@/types";

export const registerFormAction = async (
  values: z.infer<typeof userRegisterSchema>
) => {
  const user = { ...values };

  try {
    const res = await fetch(process.env.AUTH_API_URL + "/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ user: user }),
    });

    const data = await res.json();
    if (data) {
      if (data.token) {
        // cookies().set("token", data.token)
      }
      return {
        msg: "success",
      };
    }

    return {
      msg: "error",
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

    const responseData:ApiResponse<{ accessToken: string }>=await response.json();
    console.log(responseData)
    if (responseData.message === "success") {
      cookies().set("token", responseData.data.accessToken);
      return {
        msg: responseData.message,
      };
    }
    return {
      msg:responseData.message,
    };
  } catch (e) {
    console.log(e)
    return {
      msg: "error",
    };
  }
};

export const logout = async () => {
  cookies().delete("token");
};
