import { clientFetchApi } from "../client";
import { Invitation, InvitationDetail } from "./type";

export const getInvitations = async () => {
  const data: Invitation[] =
    (
      await clientFetchApi({
        endPoint: "/weddings",
        method: "GET",
      })
    )?.data ?? [];

  return data as Invitation[];
};

export const getInvitationsDetail = async (weddingId: string) => {
  const data: InvitationDetail =
    (
      await clientFetchApi({
        endPoint: `/invitation/${weddingId}`,
        method: "GET",
      })
    )?.data ?? [];

  console.log(data);

  return data as InvitationDetail;
};
