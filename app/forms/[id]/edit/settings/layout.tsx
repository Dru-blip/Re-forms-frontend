import LinkCard from "@/components/nav/link-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


export default async function SettingsLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    return (
        <section className="container py-8">
            <div className="">
                <h1 className="text-3xl font-semibold">Settings</h1>
                <p>
                    Manage your Form settings.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row">
                <nav className="w-[200px] h-[50px] flex items-center mb-2 lg:grid lg:grid-cols-1 lg:gap-4 text-md text-muted-foreground mt-4">
                    <LinkCard href={`/forms/${params.id}/edit/settings/defaults`} name={"Defaults"} />
                    <LinkCard href={`/forms/${params.id}/edit/settings/responses`} name={"Responses"} />
                </nav>
                <div className="container flex-1 lg:max-w-2xl">
                    {children}
                </div>
            </div>

        </section>
    )
}