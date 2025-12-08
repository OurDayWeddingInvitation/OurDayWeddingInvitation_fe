import { fetchApi, Method } from "@/app/lib/fetches/server";
import InvitationView from "./view";

export default async function Page() {
  const mediaRes = await fetchApi({
    endPoint: "/weddings/1/media/edit",
    method: Method.GET,
  });

  return <InvitationView />;
}
