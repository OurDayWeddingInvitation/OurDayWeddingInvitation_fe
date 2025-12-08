import Header from "@/app/components/Header";
import Card from "./components/card/Card";
import { Invitation } from "@/app/lib/fetches/invitation/type";

export default function DashboardView({
  invitations,
}: {
  invitations: Invitation[];
}) {
  return (
    <>
      <Header />
      <div className="flex flex-row max-w-[1200px] mx-auto h-dvh justify-center items-center pt-17.5 select-none gap-4">
        {invitations.map((e) => (
          <Card key={e.weddingId} invitation={e} />
        ))}
        <Card />
      </div>
    </>
  );
}
