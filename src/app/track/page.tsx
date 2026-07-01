import { redirect } from "next/navigation";

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  if (params.id) {
    redirect(`/request?id=${encodeURIComponent(params.id)}`);
  }
  redirect("/request#track-request");
}
