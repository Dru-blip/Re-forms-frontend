import DeleteResponseDialog from "@/components/responses/delete-responses-dialog";
import ResponseTable from "@/components/responses/response-table";
import Summary from "@/components/responses/summary";
import SummaryClient from "@/components/responses/summary-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";


const fetchResponses = async (formId: string) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `/${formId}/responses`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData = await response.json();
        return responseData.data;
    } catch (err) {
        return null;
    }
};

export default async function Responses({ params }: { params: { id: string; responseId: string } }) {
    const { questions, responses } = await fetchResponses(params.id);
    return (
        <div className="p-3 flex flex-col ">
            {/* <Tabs defaultValue="table" className="container">
                <TabsList className="w-full flex items-center mt-2">
                    <TabsTrigger className="w-full" value="table">
                        Table
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="summary">
                        Summary
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="individual">
                        Individual
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="table">
                    <ResponseTable header={questions} responses={responses} />
                </TabsContent>
                <TabsContent value="summary">
                    <Summary id={params.id} />
                </TabsContent>
                <TabsContent value="individual">
                    <ViewResponse params={params} />
                </TabsContent>
            </Tabs> */}
        </div>
    );
}
