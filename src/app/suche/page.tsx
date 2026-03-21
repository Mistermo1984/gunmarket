import { redirect } from "next/navigation";

export default function SuchePage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = new URLSearchParams(searchParams).toString();
  redirect(params ? `/?${params}` : "/");
}
