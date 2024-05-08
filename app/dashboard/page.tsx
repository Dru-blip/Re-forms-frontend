
import CreateFormDialog from "@/components/create-form-dialog";
import FormList from "@/components/editor/form-list";
import { getAllForms } from "@/lib/actions/form";

export default async function Dashboard(){
    const forms=await getAllForms()
    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            <CreateFormDialog/>
            <FormList forms={forms.data as []}/>
        </div>
    )
}