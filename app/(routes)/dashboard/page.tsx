import { fetchApi } from "@/app/lib/fetches/server";
import DashboardView from "./view";
import { Invitation } from "@/app/lib/fetches/invitation/type";
import { ApiResponseType } from "@/app/lib/fetches/type";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const response: ApiResponseType<Invitation[]> = await fetchApi({
    endPoint: "/weddings",
    method: "GET",
  });

  console.log(response);

  return <DashboardView invitations={response?.data ?? []} />;
}
