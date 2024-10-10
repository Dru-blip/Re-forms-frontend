"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as AuthActions from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

interface Props {
    email: string;
    otpId: string;
}

export default function UpdatePasswordForm({ email, otpId }: Props) {
    const router = useRouter();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    return (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Enter new Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Input
                placeholder="Confirm new Password"
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            />
            <Button
                onClick={async () => {
                    if (password === confirmPassword) {
                        const res = await AuthActions.updatePassword(otpId, email, password!);
                        if (res.data.message === "success") {
                            router.push("/login");
                        }
                    }
                }}
            >
                Update
            </Button>
        </div>
    );
}
