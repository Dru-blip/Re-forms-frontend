import UpdatePasswordForm from "@/components/auth/update-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import React from "react";

export default function UpdatePasswordPage({
    params,
    searchParams,
}: {
    searchParams: Record<string, string | string[]>;
    params: { id: string };
}) {
    if (!searchParams.email || !params.id) {
        redirect("/login");
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[400px] p-2">
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        {/* Email : <p>{searchParams.email}</p> */}
                        <Input value={searchParams.email} disabled/>
                        {/* <p>{searchParams.email}</p> */}
                    </div>
                    <UpdatePasswordForm email={searchParams.email as string} otpId={params.id} />
                </CardContent>
            </Card>
        </div>
    );
}
