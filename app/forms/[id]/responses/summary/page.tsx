import Header from "@/components/responses/header";
import Summary from "@/components/responses/summary";

export default function SummaryPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <Header formId={params.id} />
            <div className="container">
                <Summary id={params.id} />
            </div>
        </div>
    );
}
