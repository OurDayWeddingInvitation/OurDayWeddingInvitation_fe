"use client";

import Header from "@/app/components/Header";
import Card from "./components/card/Card";
import { Invitation } from "@/app/lib/fetches/invitation/type";
import { useCallback, useEffect, useState } from "react";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { getInvitations } from "@/app/lib/fetches/invitation";

export default function DashboardView() {
  const [response, setResponse] = useState<Invitation[]>();

  const fetchInvitations = useCallback(async () => {
    const data = await getInvitations();

    console.log(data);

    setResponse(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInvitations();
  }, [fetchInvitations]);

  const deleteInvitation = useCallback(
    async (weddingId: string) => {
      if (!weddingId) return;

      const isConfirmed = window.confirm(
        "청첩장을 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.",
      );

      if (!isConfirmed) return;

      await clientFetchApi({
        endPoint: `/weddings/${weddingId}`,
        method: "DELETE",
      });

      alert("삭제가 완료되었습니다.");

      fetchInvitations();
    },
    [fetchInvitations],
  );

  return (
    <>
      <Header showLogout={true} />
      <div className="flex flex-row max-w-[1200px] mx-auto h-dvh justify-center items-center pt-17.5 select-none gap-4">
        {(response ?? []).map((e) => (
          <Card
            key={e.weddingId}
            invitation={e}
            handleDelete={() => deleteInvitation(e.weddingId)}
          />
        ))}
        <Card />
      </div>
    </>
  );
}
