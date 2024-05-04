import { FormProvider } from "@/context/form-context"

export default function FormLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <FormProvider>
                {children}
            </FormProvider>
        </section>
    )
}