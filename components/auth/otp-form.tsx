"use client";

import * as OTPActions from "@/lib/actions/otp";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
}

export default function OTPForm({ id }: Props) {
    const [code, setCode] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <div className="bg-accent p-2 rounded-md">
                <h1 className="text-lg text-red-700">{message}</h1>
            </div>
            <Card className="p-2">
                <CardHeader>
                    <CardTitle>Verify OTP</CardTitle>
                    <CardDescription>Enter 6 digit code sent to your email address</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={async (e) => {
                            setIsLoading(true);
                            const res = await OTPActions.verifyOTP(id, code!);
                            setMessage(res.data.message);
                            if (res.data.verified) {
                                router.push(`/otp/${id}/updatePassword?email=${res.data.email}`);
                            }
                            setIsLoading(false);
                        }}
                    >
                        {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                        Verify
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
