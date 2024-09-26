import Loading from "@/app/loading";
import { Suspense } from "react";


interface Props {
    children: React.ReactNode;
    params: {
        id: string;
    };
}

export default async function ResponseLayout({ children, params }: Props) {
    return (
        <section className="flex flex-col gap-3">
            <Suspense fallback={<Loading />}>
                <div>{children}</div>
            </Suspense>
        </section>
    );
}
