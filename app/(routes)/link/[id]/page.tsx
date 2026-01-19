import { InvitationDetail } from "@/app/lib/fetches/invitation/type";
import { ImageDetail } from "@/app/lib/fetches/media/type";
import { fetchApi } from "@/app/lib/fetches/server";
import { ApiResponseType } from "@/app/lib/fetches/type";
import LinkView from "./view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const response: ApiResponseType<InvitationDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}`,
    method: "GET",
    withAuth: true,
  });

  const mediaResponse: ApiResponseType<ImageDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/media`,
    method: "GET",
    withAuth: true,
  });

  return (
    <LinkView
      weddingId={params.id}
      invitationDetail={response?.data}
      imageDetail={mediaResponse?.data}
    />
  );
}
