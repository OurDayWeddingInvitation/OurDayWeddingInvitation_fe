import { clientFetchApi } from "../client";
import { Invitation } from "./type";

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
