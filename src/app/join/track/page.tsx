import { redirect } from "next/navigation";

export default async function JoinTrackRedirect({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  redirect(id ? `/join?id=${encodeURIComponent(id)}` : "/join");
}
