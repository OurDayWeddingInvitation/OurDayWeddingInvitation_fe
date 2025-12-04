import { fetchApi, Method } from "@/app/lib/fetches/server";
import DashboardView from "./view";

export default async function DashboardPage() {
  const response = await fetchApi({
    endPoint: "/weddings",
    method: Method.GET,
  });

  console.log(response);

  return <DashboardView />;
}
