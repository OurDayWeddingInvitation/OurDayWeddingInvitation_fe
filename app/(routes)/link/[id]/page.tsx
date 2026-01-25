import { InvitationDetail } from "@/app/lib/fetches/invitation/type";
import { ImageDetail } from "@/app/lib/fetches/media/type";
import { fetchApi } from "@/app/lib/fetches/server";
import { ApiResponseType } from "@/app/lib/fetches/type";
import { formatDateWithDay, formatTime } from "@/app/lib/utils/date-format";
import { getImagePath } from "@/app/lib/utils/functions";
import LinkView from "./view";

type Props = {
  params: { id: string };
  searchParams: { via?: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: Props) {
  const weddingRes: ApiResponseType<InvitationDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}`,
    method: "GET",
    withAuth: false,
  });

  const mediaRes: ApiResponseType<ImageDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/media`,
    method: "GET",
    withAuth: false,
  });

  const weddingInfo = weddingRes?.data?.sections?.weddingInfo;

  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;

  const dateText = formatDateWithDay(
    weddingInfo?.weddingYear ?? "",
    weddingInfo?.weddingMonth ?? "",
    weddingInfo?.weddingDay ?? "",
    "withParen"
  );
  const timeText = formatTime(
    weddingInfo?.weddingTimePeriod ?? "",
    weddingInfo?.weddingHour ?? "00",
    weddingInfo?.weddingMinute ?? "00"
  );

  const placeText = `${weddingInfo?.weddingHallName ?? ""} ${
    weddingInfo?.weddingHallFloor ?? ""
  }`;

  const title = `${groomName} ❤️ ${brideName}, 결혼합니다!`;
  const description = `${dateText} ${timeText} ${placeText}`;

  const linkThumbnailImage = mediaRes?.data?.find(
    (img) => img.imageType === "linkThumbnailImage"
  );
  const imageUrl =
    linkThumbnailImage?.editedUrl ?? linkThumbnailImage?.originalUrl ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: getImagePath(imageUrl),
              width: 800,
              height: 400,
              alt: "청첩장 썸네일",
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const response: ApiResponseType<InvitationDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}`,
    method: "GET",
    withAuth: false,
  });

  const mediaResponse: ApiResponseType<ImageDetail> = await fetchApi({
    endPoint: `/weddings/${params.id}/media`,
    method: "GET",
    withAuth: false,
  });

  return (
    <LinkView
      weddingId={params.id}
      invitationDetail={response?.data}
      imageDetail={mediaResponse?.data}
    />
  );
}
