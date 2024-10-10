import { Form } from "@/types";
import FormCard from "./form-card";

interface Props {
    forms: Form[];
}

export default function FormList({ forms }: Props) {
    return (
        <div className="lg:grid lg:grid-cols-3 grid grid-cols-1 gap-4 lg:gap-5">
            {forms ? forms.map((form, index) => <FormCard form={form} key={index} />) : <></>}
        </div>
    );
}
