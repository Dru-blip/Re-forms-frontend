"use client";

import { loginFormAction } from "@/lib/actions/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await loginFormAction(email, password);
        if (res.msg === "success") {
            router.push("/dashboard");
        }
        setMessage(res.msg);
        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-1 gap-5">
            {message ? (
                <div className="bg-accent p-2 rounded-md">
                    <h1 className="text-lg text-red-700">{message}</h1>
                </div>
            ) : (
                <></>
            )}

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <div>
                    <CardContent className="grid gap-4">
                        <Input
                            placeholder="m@example.com"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="w-full flex items-center justify-end mb-2">
                            <Link href="/forgotPassword" className="underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                            Sign in
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
}
