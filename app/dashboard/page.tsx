import CreateFormButton from "@/components/create-form-button";
import FormList from "@/components/form-list";
import { getAllForms } from "@/lib/actions/form";

export default async function Dashboard(){
    const forms=await getAllForms()
    return (
        <div className="container py-8 grid grid-cols-1 gap-4">
            <CreateFormButton/>
            <FormList forms={forms.data as []}/>
        </div>
    )
}