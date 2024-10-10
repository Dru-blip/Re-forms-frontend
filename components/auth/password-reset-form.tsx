"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

enum Status {
    SEND_CODE = "Send Code",
    CODE_SENT = "Code sent",
    SENDING = "Sending",
}

// type Status="Send Code"|"Code Sent"|"Sending"

export default function PasswordResetForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [email, setEmail] = useState<string>();
    const [status, setStatus] = useState<Status>(Status.SEND_CODE);
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Enter Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        required
                    />
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={async (e) => {
                            setIsLoading(true);
                            setStatus(Status.SENDING);
                            const response = await fetch("/api/auth/forgotPassword", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ email }),
                            });
                            const responseData = await response.json();
                            console.log(responseData);
                            setStatus(Status.CODE_SENT);
                            setIsLoading(false);
                            if (responseData.data.sent) {
                                router.push(`/otp/${responseData.data.id}/verify`);
                            }
                        }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> {status}
                            </>
                        ) : (
                            <>
                                {status === Status.CODE_SENT ? (
                                    <>
                                        <CheckIcon className="mr-2 w-4 h-4" /> {status}
                                    </>
                                ) : (
                                    <>{status}</>
                                )}
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
