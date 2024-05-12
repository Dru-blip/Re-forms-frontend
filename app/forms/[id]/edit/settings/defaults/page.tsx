import DefaultSettings from "@/components/settings/default-settings";
import { getSetting } from "@/lib/actions/settings";



export default async function Defaults({ params }: { params: { id: string } }) {
    const settings = await getSetting(params.id)

    return (
        <DefaultSettings  setting={settings.data!} />
    )
}