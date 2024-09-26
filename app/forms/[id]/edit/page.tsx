import FormEditor from "@/components/editor/form-editor";


export default async function EditPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col h-full">
            <div className="bg-accent h-full">
                <FormEditor />
            </div>
        </div>
    )
}