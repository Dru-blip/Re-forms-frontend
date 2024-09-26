"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function IndividualResponsePageHeader({
    formId,
    responseNo,
    totalResponses,
}: {
    formId: string;
    responseNo: number;
    totalResponses: number;
}) {
    const searchParams = useSearchParams();

    const router = useRouter();
    return (
        <div className="flex items-center gap-3">
            <Button
                variant={"outline"}
                disabled={responseNo < 2}
                onClick={(e) => {
                    // console.log(responseNo)
                    router.push(`/forms/${formId}/responses/individual?response=${responseNo - 1}`);
                }}
            >
                <Icon icon="weui:back-filled" />
            </Button>
            <div className="flex items-center gap-4">
                <p>{responseNo}</p>
                <p>of</p>
                <p>{totalResponses}</p>
            </div>
            <Button
                variant={"outline"}
                disabled={responseNo>=totalResponses}
                onClick={(e) => {
                    router.push(`/forms/${formId}/responses/individual?response=${responseNo + 1}`);
                }}
            >
                <Icon icon="formkit:right" />
            </Button>
        </div>
    );
}
