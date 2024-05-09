import EditPageHeader from "@/components/editor/header"
import { getForm } from "@/lib/actions/form"


export default async function FormLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params:{
        id:string
    }
}) {
    const form=await getForm(params.id)
    return (
        <section>
            <EditPageHeader id={params.id} title={form.data?.title!}/>
            {children}
        </section>
    )
}