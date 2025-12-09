import {
  ImageDetail,
  InvitationDetail,
} from "@/app/lib/fetches/invitation/type";
import { fetchApi } from "@/app/lib/fetches/server";
import { ApiResponseType } from "@/app/lib/fetches/type";
import InvitationView from "./view";

export default async function Page({ params }: { params: { id: string } }) {
  const response: ApiResponseType<InvitationDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/edit`,
    method: "GET"
  });

  const mediaResponse: ApiResponseType<ImageDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/media/edit`,
    method: "GET",
  });

  return (
    <InvitationView
      invitationDetail={response?.data}
      imageDetail={mediaResponse?.data}
    />
  );
}
