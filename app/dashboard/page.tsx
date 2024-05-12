
import CreateFormDialog from "@/components/create-form-dialog";
import FormList from "@/components/editor/form-list";
import { Separator } from "@/components/ui/separator";
import { getAllForms } from "@/lib/actions/form";

export default async function Dashboard() {
    const forms = await getAllForms()
    
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            <div className="w-full bg-accent py-8">
                <div className="container grid grid-cols-1 gap-4 items-center justify-start">
                    <h1 className="text-lg font-semibold">Start a new Form</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        <CreateFormDialog />
                    </div>
                </div>
            </div>
            <div className="container py-8 grid grid-cols-1 gap-3">
                <h1 className="text-lg font-semibold">Recent Forms</h1>
                <FormList forms={forms.data as []} />
            </div>

        </div>
    )
}