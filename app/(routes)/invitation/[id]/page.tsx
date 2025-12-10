import { fetchApi } from "@/app/lib/fetches/server";
import InvitationView from "./view";
import { ApiResponseType } from "@/app/lib/fetches/type";
import { InvitationDetail } from "@/app/lib/fetches/invitation/type";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const response: ApiResponseType<InvitationDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/edit`,
    method: "GET",
  });

  return <InvitationView invitationDetail={response?.data} />;
}
