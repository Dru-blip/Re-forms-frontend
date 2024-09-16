import ResponseSettings from "@/components/settings/response-settings";

export default async function Responses({
  params,
}: {
  params: { id: string };
}) {
  return <ResponseSettings />;
}
